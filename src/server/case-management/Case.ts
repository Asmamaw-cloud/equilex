import { db } from "@/lib/db";
import { isClient, isLawyer } from "../checkRole";
import { Payment } from "../payment-management/Payment";

export class Case {
  static async create(
    client_id: number,
    lawyer_id: number,
    title: string,
    description: string,
    price: number,
    location: string
  ) {
    const newCase = await db.case.create({
      data: {
        client_id,
        lawyer_id,
        title,
        description,
        price,
        location,
      },
    });
    return newCase;
  }

  static async getClientCases(client_id: number) {
    await isClient();
    const cases = await db.case.findMany({
      where: {
        client_id,
      },
    });
    return cases;
  }

  static async getUpcomingTrials() {
    const lawyer = await isLawyer();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const trials = await db.trial.findMany({
      where: {
        trial_date: {
          gte: today,
        },
        case: {
          //@ts-ignore
          lawyer_id: lawyer.user.image.id,
        },
      },
    });
    return trials;
  }

  static async getLawyerCases(lawyer_id: number) {
    await isLawyer();
    const cases = await db.case.findMany({
      where: {
        lawyer_id,
      },
    });
    return cases;
  }

  static async acceptOffer(case_id: number) {
    const acceptedCase = await db.case.update({
      where: {
        id: case_id,
      },
      data: {
        status: "ACCEPTED",
      },
    });

    console.log("acceptedCase: ", acceptedCase);

    // Create initial contract
    const contract = await db.contract.create({
      data: {
        case_id: acceptedCase.id,
        lawyer_id: acceptedCase.lawyer_id,
        client_id: acceptedCase.client_id,
        terms: `This contract is for the case "${acceptedCase.title}". The agreed price is ${acceptedCase.price} ETB. The lawyer will provide legal services as described in the case description.`,
        status: "DRAFT",
      },
    });
    console.log("contract: ", contract);

    const client = await db.client.findUnique({
      where: {
        id: acceptedCase.client_id,
      },

      select: {
        email: true,
        full_name: true,
        phone_number: true,
      },
    });
    const firstName = client?.full_name.split(" ")[0];
    const lastName = client?.full_name.split(" ")[1];

    console.log("client info for a specific accepted case: ", client);

    const checkout_url = await Payment.initiate(
      // @ts-ignore
      client.email,
      // @ts-ignore
      firstName,
      lastName,
      // @ts-ignore
      client.phone_number,
      acceptedCase.id
    );
    console.log("checkout_url: ", checkout_url);

    return checkout_url;
  }

  static async rejectOffer(case_id: number) {
    const rejectedCase = await db.case.update({
      where: {
        id: case_id,
      },
      data: {
        status: "REJECTED",
      },
    });
    return rejectedCase;
  }

  static async addTrialDates(
    trial_date: Date,
    case_id: number,
    description: string,
    location: string
  ) {
    await isLawyer();
    const newTrial = await db.trial.create({
      data: {
        case_id,
        trial_date,
        description,
        location,
      },
    });
    return newTrial;
  }

  static async deliver(case_id: number) {
    await isLawyer();
    const deliveredCase = await db.case.update({
      where: { id: case_id },
      data: {
        status: "DELIVERED",
      },
    });
    return deliveredCase;
  }

  static async acceptDelivery(case_id: number) {
    await isClient();
    const acceptedCase = await db.case.update({
      where: { id: case_id },
      data: {
        status: "FINISHED",
      },
    });
    if (!acceptedCase) {
      throw new Error("Case doesn't exist");
    }

    // update lawyer balance
    await db.lawyer.update({
      where: {
        id: acceptedCase.lawyer_id,
      },
      data: {
        balance: {
          increment: acceptedCase.price - acceptedCase.price * 0.05,
        },
      },
    });

    // update transaction status
    await db.transaction.update({
      where: {
        payment_id: acceptedCase.payment_id + "",
      },
      data: {
        status: "TRANSFERRED",
        paid_at: new Date(),
      },
    });
    return acceptedCase;
  }

  static async getTodayTrialsForLawyer() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const lawyer = await isLawyer();

    const trials = await db.trial.findMany({
      where: {
        case: {
          //@ts-ignore
          lawyer_id: lawyer.user.image.id,
        },
        trial_date: {
          gte: today,
          lt: tomorrow,
        },
      },
    });
    return trials;
  }

  static async getTodayTrialsForClient() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const client = await isClient();

    const trials = await db.trial.findMany({
      where: {
        case: {
          //@ts-ignore
          client_id: client.user.image.id,
        },
        trial_date: {
          gte: today,
          // lt: tomorrow,
        },
      },
    });
    console.log("Here are client trials at the back: ", trials);
    return trials;
  }
}

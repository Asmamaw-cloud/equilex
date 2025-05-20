// import { db } from "@/lib/db";
// import { isAuthenticated, isClient, isLawyer } from "../checkRole";

import { db } from "@/lib/db";

// export class Contract {
//   static async create(
//     case_id: number,
//     lawyer_id: number,
//     client_id: number,
//     terms: string
//   ) {
    
//     const newContract = await db.contract.create({
//       data: {
//         case_id,
//         lawyer_id,
//         client_id,
//         terms,
//         status: "DRAFT",
//       },
//     });
//     return newContract;
//   }

//   static async getByCaseId(case_id: number) {
//     await isAuthenticated();
//     const contract = await db.contract.findUnique({
//       where: {
//         case_id,
//       },
//       include: {
//         lawyer: true,
//         client: true,
//         case: true,
//       },
//     });
//     return contract;
//   }

//   static async getClientContracts(client_id: number) {
//     await isClient();
//     const contracts = await db.contract.findMany({
//       where: {
//         client_id,
//       },
//       include: {
//         lawyer: true,
//         case: true,
//       },
//     });
//     return contracts;
//   }

//   static async getLawyerContracts(lawyer_id: number) {
//     await isLawyer();
//     const contracts = await db.contract.findMany({
//       where: {
//         lawyer_id,
//       },
//       include: {
//         client: true,
//         case: true,
//       },
//     });
//     return contracts;
//   }

//   static async signContract(case_id: number) {
//     await isClient();
//     const signedContract = await db.contract.update({
//       where: {
//         case_id,
//       },
//       data: {
//         status: "SIGNED",
//         signed_at: new Date(),
//       },
//     });
//     return signedContract;
//   }

//   static async updateTerms(case_id: number, terms: string) {
//     await isLawyer();
//     const updatedContract = await db.contract.update({
//       where: {
//         case_id,
//       },
//       data: {
//         terms,
//       },
//     });
//     return updatedContract;
//   }

//   static async terminateContract(case_id: number) {
//     await isAuthenticated();
//     const terminatedContract = await db.contract.update({
//       where: {
//         case_id,
//       },
//       data: {
//         status: "TERMINATED",
//       },
//     });
//     return terminatedContract;
//   }
// }




export class Contract {
  static async createContract(data: {
    case_id: number;
    lawyer_id: number;
    client_id: number;
    terms: string;
  }) {
    return db.contract.create({
      data: {
        ...data,
        status: 'DRAFT'
      }
    });
  }

  static async getContractById(id: number) {
    return db.contract.findUnique({
      where: { id },
      include: {
        lawyer: true,
        client: true,
        case: true
      }
    });
  }

  static async updateContract(id: number, data: { terms: string }) {
    return db.contract.update({
      where: { id },
      data
    });
  }

  static async signContract(id: number) {
    return db.contract.update({
      where: { id },
      data: {
        status: 'SIGNED',
        signed_at: new Date()
      }
    });
  }

  static async getLawyerContracts(lawyerId: number) {
    return db.contract.findMany({
      where: { lawyer_id: lawyerId },
      include: {
        client: true,
        case: true
      }
    });
  }

  static async getAllContracts() {
    return db.contract.findMany({
      include: {
        lawyer: true,
        client: true,
        case: true
      }
    });
  }
}
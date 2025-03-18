import { data } from '@/app/data/lawyersMockData'
import React from 'react'
import LawyerDetail from '../components/lawyerDetail'

const EachLawyer = () => {
  return (
    <div>
        <LawyerDetail lawyers={data} />
    </div>
  )
}

export default EachLawyer
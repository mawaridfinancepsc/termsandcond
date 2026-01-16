import React from 'react'

type Props = {}

const FeaturesTable = (props: Props) => {
  return (
    <div>

        <div className="max-w-5xl border border-gray-300 overflow-hidden">
  <div className="bg-[#c9c39a] px-4 py-2">
    <h2 className="text-sm font-semibold text-gray-800">
      Key Product Features
    </h2>
  </div>

  <table className="w-full border-collapse text-sm">
    <tbody>
      <tr className="border-t border-gray-300">
        <td className="w-1/3 bg-gray-100 px-3 py-2 font-medium text-gray-800 border-r border-gray-300">
          Maximum Facility Tenor:
        </td>
        <td className="px-3 py-2 text-gray-700">
          60 months
        </td>
      </tr>

      <tr className="border-t border-gray-300">
        <td className="bg-gray-100 px-3 py-2 font-medium text-gray-800 border-r border-gray-300">
          Down payment out of price:
        </td>
        <td className="px-3 py-2 text-gray-700">
          Minimum 20% of the vehicle/car price
        </td>
      </tr>

      <tr className="border-t border-gray-300">
        <td className="bg-gray-100 px-3 py-2 font-medium text-gray-800 border-r border-gray-300">
          Upfront Instalment Deferments (Grace Period for 1st Instalment):
        </td>
        <td className="px-3 py-2 text-gray-700">
          Up to 90 days for 1st instalment.
        </td>
      </tr>

      <tr className="border-t border-gray-300">
        <td className="bg-gray-100 px-3 py-2 font-medium text-gray-800 border-r border-gray-300">
          Instalment Postponements:
        </td>
        <td className="px-3 py-2 text-gray-700">
          One instalment postponement is allowed in a year with a gap of 6 instalment payments.
          You can avail one instalment postponement in a year without any instalment postponement fee.
        </td>
      </tr>

      <tr className="border-t border-gray-300">
        <td className="bg-gray-100 px-3 py-2 font-medium text-gray-800 border-r border-gray-300">
          Early Settlement:
        </td>
        <td className="px-3 py-2 text-gray-700">
          Finance can be fully settled any time by you before the maturity date of finance by
          providing proof of source of funds with 1% early settlement charges.
        </td>
      </tr>

      <tr className="border-t border-gray-300">
        <td className="bg-gray-100 px-3 py-2 font-medium text-gray-800 border-r border-gray-300">
          Partial Settlement:
        </td>
        <td className="px-3 py-2 text-gray-700">
          Finance can be partially settled any time by you before the maturity date of finance
          by providing proof of source of funds.
        </td>
      </tr>

      <tr className="border-t border-gray-300">
        <td className="bg-gray-100 px-3 py-2 font-medium text-gray-800 border-r border-gray-300">
          Advance Payment:
        </td>
        <td className="px-3 py-2 text-gray-700">
          You could pay a maximum of three instalments in advance.
          You pay next instalment after two months.
        </td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
  )
}

export default FeaturesTable
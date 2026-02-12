/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/tools/invoice-generator',
        destination: '/invoice-generator',
        permanent: true,
      },
      {
        source: '/tools/sales-receipt-generator',
        destination: '/sales-receipt-generator',
        permanent: true,
      },
      {
        source: '/tools/purchase-order-generator',
        destination: '/purchase-order-generator',
        permanent: true,
      },
      {
        source: '/tools/offer-letter-generator',
        destination: '/offer-letter-generator',
        permanent: true,
      },
      {
        source: '/tools/petty-cash-voucher-generator',
        destination: '/petty-cash-voucher-generator',
        permanent: true,
      },
      {
        source: '/gst-invoice-generator',
        destination: '/goods-and-services-tax-invoice-generator',
        permanent: true,
      },
      {
        source: '/sku-generator',
        destination: '/stock-keeping-unit-generator',
        permanent: true,
      },
      {
        source: '/grn-generator',
        destination: '/goods-received-note-generator',
        permanent: true,
      },
      {
        source: '/tds-calculator',
        destination: '/tax-deducted-at-source-calculator',
        permanent: true,
      },
      {
        source: '/mou-generator',
        destination: '/memorandum-of-understanding-generator',
        permanent: true,
      },
      {
        source: '/tools/goods-and-services-tax-invoice-generator',
        destination: '/goods-and-services-tax-invoice-generator',
        permanent: true,
      },
      {
        source: '/tools/stock-keeping-unit-generator',
        destination: '/stock-keeping-unit-generator',
        permanent: true,
      },
      {
        source: '/tools/goods-received-note-generator',
        destination: '/goods-received-note-generator',
        permanent: true,
      },
      {
        source: '/tools/tax-deducted-at-source-calculator',
        destination: '/tax-deducted-at-source-calculator',
        permanent: true,
      },
      {
        source: '/tools/memorandum-of-understanding-generator',
        destination: '/memorandum-of-understanding-generator',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/invoice-generator',
        destination: '/tools/invoice-generator',
      },
      {
        source: '/sales-receipt-generator',
        destination: '/tools/sales-receipt-generator',
      },
      {
        source: '/purchase-order-generator',
        destination: '/tools/purchase-order-generator',
      },
      {
        source: '/offer-letter-generator',
        destination: '/tools/offer-letter-generator',
      },
      {
        source: '/goods-and-services-tax-invoice-generator',
        destination: '/tools/goods-and-services-tax-invoice-generator',
      },
      {
        source: '/tax-deducted-at-source-calculator',
        destination: '/tools/tax-deducted-at-source-calculator',
      },
      {
        source: '/appointment-letter-generator',
        destination: '/tools/appointment-letter-generator',
      },
      {
        source: '/appointment-order-generator',
        destination: '/tools/appointment-letter-generator',
      },
      {
        source: '/attendance-form-generator',
        destination: '/tools/attendance-form-generator',
      },
      {
        source: '/compliance-checklist-generator',
        destination: '/tools/compliance-checklist-generator',
      },
      {
        source: '/expense-report-generator',
        destination: '/tools/expense-report-generator',
      },
      {
        source: '/free-barcode-generator',
        destination: '/tools/free-barcode-generator',
      },
      {
        source: '/job-description-generator',
        destination: '/tools/job-description-generator',
      },
      {
        source: '/leave-application-generator',
        destination: '/tools/leave-application-generator',
      },
      {
        source: '/meeting-minutes-generator',
        destination: '/tools/meeting-minutes-generator',
      },
      {
        source: '/nda-generator',
        destination: '/tools/nda-generator',
      },
      {
        source: '/packing-slip-generator',
        destination: '/tools/packing-slip-generator',
      },
      {
        source: '/project-cost-quote',
        destination: '/tools/project-cost-quote',
      },
      {
        source: '/resume-generator',
        destination: '/tools/resume-generator',
      },
      {
        source: '/terms-and-conditions-generator',
        destination: '/tools/terms-and-conditions-generator',
      },
      {
        source: '/work-order-generator',
        destination: '/tools/Work-order-generator',
      },
      {
        source: '/credit-note-generator',
        destination: '/tools/credit-note-generator',
      },
      {
        source: '/debit-note-generator',
        destination: '/tools/debit-note-generator',
      },
      {
        source: '/delivery-challan-generator',
        destination: '/tools/delivery-challan-generator',
      },
      {
        source: '/experience-letter-generator',
        destination: '/tools/experience-letter-generator',
      },
      {
        source: '/purchase-return-generator',
        destination: '/tools/purchase-return-generator',
      },
      {
        source: '/quotation-generator',
        destination: '/tools/quotation-generator',
      },
      {
        source: '/refund-policy-generator',
        destination: '/tools/refund-policy-generator',
      },
      {
        source: '/salary-slip-generator',
        destination: '/tools/salary-slip-generator',
      },
      {
        source: '/sales-return-generator',
        destination: '/tools/sales-return-generator',
      },
      {
        source: '/resume-generator',
        destination: '/tools/resume-generator',
      },
      {
        source: '/terms-and-conditions-generator',
        destination: '/tools/terms-and-conditions-generator',
      },
      {
        source: '/packing-slip-generator',
        destination: '/tools/packing-slip-generator',
      },
      {
        source: '/proforma-invoice-generator',
        destination: '/tools/proforma-invoice-generator',
      },
      {
        source: '/expense-report-generator',
        destination: '/tools/expense-report-generator',
      },
      {
        source: '/expense-report-generator',
        destination: '/tools/expense-report-generator',
      },
      {
        source: '/gst-invoice-generator',
        destination: '/tools/goods-and-services-tax-invoice-generator',
      },
      {
        source: '/leave-application-generator',
        destination: '/tools/leave-application-generator',
      },
      {
        source: '/offer-letter-generator',
        destination: '/tools/offer-letter-generator',
      },
      {
        source: '/meeting-minutes-generator',
        destination: '/tools/meeting-minutes-generator',
      },
      {
        source: '/job-description-generator',
        destination: '/tools/job-description-generator',
      },
      {
        source: '/job-description-generator',
        destination: '/tools/job-description-generator',
      },
      {
        source: '/memorandum-of-understanding-generator',
        destination: '/tools/memorandum-of-understanding-generator',
      },
      {
        source: '/nda-generator',
        destination: '/tools/nda-generator',
      },
      {
        source: '/purchase-order-generator',
        destination: '/tools/purchase-order-generator',
      },
      {
        source: '/appointment-letter-generator',
        destination: '/tools/appointment-letter-generator',
      },
      {
        source: '/appointment-order-generator',
        destination: '/tools/appointment-letter-generator',
      },
      {
        source: '/attendance-form-generator',
        destination: '/tools/attendance-form-generator',
      },
      {
        source: '/attendance-form-generator',
        destination: '/tools/attendance-form-generator',
      },
      {
        source: '/invoice-generator',
        destination: '/tools/invoice-generator',
      },
      {
        source: '/sales-receipt-generator',
        destination: '/tools/sales-receipt-generator',
      },
      {
        source: '/checklist-generator',
        destination: '/tools/checklist-generator',
      },
      {
        source: '/compliance-checklist-generator',
        destination: '/tools/compliance-checklist-generator',
      },
      {
        source: '/barcode-generator',
        destination: '/tools/free-barcode-generator',
      },
      {
        source: '/barcode-generator',
        destination: '/tools/free-barcode-generator',
      },
      {
        source: '/budget-calculator',
        destination: '/tools/budget-calculator',
      },
      {
        source: '/project-cost-quote',
        destination: '/tools/project-cost-quote',
      },
      {
        source: '/stock-keeping-unit-generator',
        destination: '/tools/stock-keeping-unit-generator',
      },
      {
        source: '/petty-cash-voucher-generator',
        destination: '/tools/petty-cash-voucher-generator',
      },
      {
        source: '/goods-received-note-generator',
        destination: '/tools/goods-received-note-generator',
      },
      {
        source: '/stock-transfer-note-generator',
        destination: '/tools/stock-transfer-note-generator',
      },
      {
        source: '/tds-calculator',
        destination: '/tools/tax-deducted-at-source-calculator',
      },

    ];
  },










};

module.exports = nextConfig;

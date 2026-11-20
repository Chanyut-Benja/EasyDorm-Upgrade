export const INITIAL_USER = {
  studentId: '67070037',
  name: 'ชญานนท์ ใจดี',
  fullName: 'นายชญานนท์ ใจดี',
  roomNo: 'B-402',
  roomFloor: 'ชั้น 4 อาคาร B',
  roomDisplay: 'ห้อง B-402 (ชั้น 4 อาคาร B)',
  dormName: 'หอพักนักศึกษา อาคาร B',
  verified: true,
  phone: '089-123-4567',
  email: 'chayanon.j@university.ac.th',
};

export const INITIAL_ADMIN = {
  staffId: 'STAFF-001',
  name: 'วิภาดา สุขใจ',
  fullName: 'คุณวิภาดา สุขใจ',
  roleTitle: 'ผู้ดูแลหอพัก อาคาร B',
  dormName: 'หอพักนักศึกษา อาคาร B',
};

export const INITIAL_RESIDENT_STATS = {
  verifiedRooms: 128,
  totalRooms: 140,
};

export const INITIAL_UNPAID_BILLS = [
  {
    id: 'bill-nov-2569',
    month: 'เดือน พฤศจิกายน 2569',
    dueDate: 'กำหนดชำระ 25 พ.ย. 2569',
    waterUnits: 10,
    electricUnits: 387,
    water: 180.0,
    electric: 2320.93,
    total: 2500.93,
  },
  {
    id: 'bill-oct-2569',
    month: 'เดือน ตุลาคม 2569',
    dueDate: 'ครบกำหนดแล้ว',
    waterUnits: 9,
    electricUnits: 331,
    water: 165.0,
    electric: 1985.5,
    total: 2150.5,
  },
];

export const INITIAL_PAYMENT_HISTORY = [
  {
    id: 'hist-sep-2569',
    month: 'เดือน กันยายน 2569',
    water: 150.0,
    electric: 1840.25,
    total: 1990.25,
    paidDate: '25 ก.ย. 2569',
    transactionId: 'ED2569092501',
    status: 'ชำระแล้ว',
  },
  {
    id: 'hist-aug-2569',
    month: 'เดือน สิงหาคม 2569',
    water: 165.0,
    electric: 1920.5,
    total: 2085.5,
    paidDate: '24 ส.ค. 2569',
    transactionId: 'ED2569082409',
    status: 'ชำระแล้ว',
  },
  {
    id: 'hist-jul-2569',
    month: 'เดือน กรกฎาคม 2569',
    water: 170.0,
    electric: 2015.0,
    total: 2185.0,
    paidDate: '25 ก.ค. 2569',
    transactionId: 'ED2569072514',
    status: 'ชำระแล้ว',
  },
];

export const INITIAL_REPORTS = [
  {
    id: 'rep-1',
    title: 'แอร์ไม่เย็น มีน้ำหยดบริเวณตัวเครื่อง',
    category: 'เครื่องปรับอากาศ',
    description:
      'เปิดแอร์แล้วมีน้ำหยดลงพื้นตลอดเวลา และลมไม่เย็นเท่าที่ควร (ห้อง B-402)',
    reporterName: 'นายชญานนท์ ใจดี',
    roomNo: 'B-402',
    status: 'Success',
    createdAt: '10 พ.ย. 2569',
    rated: false,
    rating: 0,
    comment: '',
  },
  {
    id: 'rep-2',
    title: 'หลอดไฟห้องน้ำกระพริบและดับ',
    category: 'ไฟฟ้า',
    description:
      'หลอดไฟ LED ในห้องน้ำกระพริบถี่และดับสนิทเมื่อวานช่วงเย็น ต้องการเปลี่ยนหลอดใหม่',
    reporterName: 'นายชญานนท์ ใจดี',
    roomNo: 'B-402',
    status: 'Pending',
    createdAt: '15 พ.ย. 2569',
    rated: false,
    rating: 0,
    comment: '',
  },
];

export const INITIAL_PAYMENT_VERIFICATIONS = [
  {
    id: 'pay-ver-1',
    historyId: null,
    studentName: 'นางสาวพิมพ์ชนก สุขสันต์',
    studentId: '67070112',
    roomNo: 'B-305',
    month: 'เดือน พฤศจิกายน 2569',
    water: 150.0,
    electric: 1890.0,
    total: 2040.0,
    paidDate: '16 พ.ย. 2569',
    transactionId: 'ED2569111608',
    method: 'PromptPay QR',
    status: 'รอตรวจสอบ',
  },
  {
    id: 'pay-ver-2',
    historyId: null,
    studentName: 'นายธนวัฒน์ พงษ์ไพร',
    studentId: '67070204',
    roomNo: 'B-211',
    month: 'เดือน พฤศจิกายน 2569',
    water: 165.0,
    electric: 2110.5,
    total: 2275.5,
    paidDate: '15 พ.ย. 2569',
    transactionId: 'ED2569111542',
    method: 'Mobile Banking (K+)',
    status: 'ชำระแล้ว',
  },
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    tag: 'แจ้งซ่อมบำรุง',
    theme: 'water',
    title: 'แจ้งปิดปรับปรุงระบบน้ำประปาชั่วคราว',
    brief:
      'แจ้งปิดปรับปรุงระบบน้ำประปาชั่วคราว วันที่ 20 พ.ย. 2569 เวลา 10:00 - 14:00 น. เพื่อทำความสะอาดถังเก็บน้ำประจำปี',
    date: '16 พฤศจิกายน 2569',
    schedule: '20 พ.ย. 2569 • 10:00 - 14:00 น.',
    body: [
      'เรียน นักศึกษาผู้พักอาศัยหอพักนักศึกษา อาคาร B ทุกท่าน',
      'ฝ่ายอาคารสถานที่ขอแจ้งกำหนดการปิดปรับปรุงระบบท่อน้ำประปาและล้างถังเก็บน้ำประจำปี เพื่อยกระดับคุณภาพน้ำสะอาดภายในหอพัก ในวันศุกร์ที่ 20 พฤศจิกายน 2569 เวลา 10:00 - 14:00 น.',
      'ในช่วงเวลาดังกล่าว น้ำประปาจะหยุดไหลชั่วคราว ขอความร่วมมือนักศึกษาสำรองน้ำไว้ใช้ล่วงหน้า หากดำเนินการแล้วเสร็จก่อนกำหนดจะเปิดจ่ายน้ำทันที ขออภัยในความไม่สะดวกมา ณ ที่นี้',
    ],
  },
  {
    id: 'ann-2',
    tag: 'สาธารณสุข',
    theme: 'clean',
    title: 'กำหนดการฉีดพ่นยุงและทำความสะอาดพื้นที่ส่วนกลาง',
    brief:
      'ขอความร่วมมือนักศึกษาปิดประตู-หน้าต่างระเบียง ในวันที่ 24 พ.ย. 2569 เวลา 13:00 - 16:00 น.',
    date: '14 พฤศจิกายน 2569',
    schedule: '24 พ.ย. 2569 • 13:00 - 16:00 น.',
    body: [
      'เรียน นักศึกษาผู้พักอาศัยทุกชั้น',
      'สำนักงานหอพักจะดำเนินการฉีดพ่นหมอกควันกำจัดยุงลายและทำความสะอาดพื้นที่ส่วนกลาง โถงทางเดิน และบริเวณรอบอาคาร B ในวันอังคารที่ 24 พฤศจิกายน 2569 เวลา 13:00 - 16:00 น.',
      'กรุณาปิดประตู หน้าต่าง และเก็บเสื้อผ้าที่ตากบริเวณระเบียงให้เรียบร้อยก่อนเวลาดังกล่าว เพื่อความปลอดภัยของนักศึกษาทุกท่าน',
    ],
  },
  {
    id: 'ann-3',
    tag: 'งานทะเบียนหอพัก',
    theme: 'contract',
    title: 'เปิดรับสมัครต่อสัญญาหอพัก ภาคเรียนที่ 2/2569',
    brief:
      'นักศึกษาที่ประสงค์พักต่อในภาคเรียนที่ 2/2569 สามารถยืนยันสิทธิ์ได้ตั้งแต่วันที่ 1 - 15 ธ.ค. 2569',
    date: '10 พฤศจิกายน 2569',
    schedule: '1 - 15 ธ.ค. 2569',
    body: [
      'เรียน นักศึกษาผู้พักอาศัยปัจจุบันทุกท่าน',
      'สำนักงานหอพักเปิดให้แจ้งความประสงค์ต่อสัญญาการเข้าพัก ประจำภาคการศึกษาที่ 2/2569 ตั้งแต่วันที่ 1 ถึง 15 ธันวาคม 2569 โดยสามารถตรวจสอบยอดค้างชำระและกดยืนยันสิทธิ์ได้ที่เคาน์เตอร์ธุรการหอพัก ชั้น 1',
      'นักศึกษาต้องไม่มียอดค้างชำระค่าบริการหอพักเกินกำหนด จึงจะสามารถดำเนินการต่อสัญญาได้ หากมีข้อสงสัยติดต่อ Line Official: @EasyDormB',
    ],
  },
];

export const PROMPTPAY_INFO = {
  accountName: 'หอพักนักศึกษา Easy Dorm (อาคาร B)',
  promptPayId: '099-345-6789',
  bankName: 'ธนาคารกรุงไทย (KTB)',
  accountNumber: '660-0-45128-9',
};

export const MOBILE_BANKS = [
  {
    id: 'kbank',
    name: 'กสิกรไทย',
    short: 'K+',
    color: '#138F2D',
    textColor: '#FFFFFF',
  },
  {
    id: 'ktb',
    name: 'กรุงไทย',
    short: 'KTB',
    color: '#00A5E3',
    textColor: '#FFFFFF',
  },
  {
    id: 'scb',
    name: 'ไทยพาณิชย์',
    short: 'SCB',
    color: '#4E2A84',
    textColor: '#FFFFFF',
  },
  {
    id: 'bbl',
    name: 'กรุงเทพ',
    short: 'BBL',
    color: '#1E4598',
    textColor: '#FFFFFF',
  },
  {
    id: 'bay',
    name: 'กรุงศรี',
    short: 'KMA',
    color: '#FEC43B',
    textColor: '#18181B',
  },
];

export function formatBaht(amount) {
  return Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

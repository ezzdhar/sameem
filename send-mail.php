<?php
/**
 * Sameem UPVC - Contact Form Email Handler for Hostinger
 * Target Email: info@sameemupvc.com
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
} 

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// Read raw JSON or form-urlencoded POST
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    $data = $_POST;
}

// Extract and sanitize fields
$firstName = isset($data['firstName']) ? trim(strip_tags($data['firstName'])) : '';
$lastName  = isset($data['lastName']) ? trim(strip_tags($data['lastName'])) : '';
$email     = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$phone     = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$message   = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

$fullName = trim($firstName . ' ' . $lastName);

// Validation
if (empty($firstName) || empty($lastName) || empty($email) || empty($phone) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'يرجى ملء جميع الحقول المطلوبة.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'صيغة البريد الإلكتروني غير صحيحة.']);
    exit;
}

// Email settings
$toEmail = 'info@sameemupvc.com';
$subject = 'طلب تواصل جديد من موقع صميم UPVC: ' . $fullName;

// HTML Message Body
$emailBody = '
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>طلب تواصل جديد</title>
</head>
<body style="font-family: Arial, Tahoma, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333; direction: rtl; text-align: right;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    
    <div style="background-color: #111827; padding: 25px; text-align: center; border-bottom: 4px solid #ECBD60;">
      <h2 style="color: #ECBD60; margin: 0; font-size: 24px;">SAMEEM UPVC - صميم</h2>
      <p style="color: #d1d5db; margin: 5px 0 0 0; font-size: 14px;">رسالة جديدة من نموذج التواصل في الموقع الإلكتروني</p>
    </div>

    <div style="padding: 30px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; font-weight: bold; width: 35%; color: #4b5563;">الاسم بالكامل:</td>
          <td style="padding: 12px; color: #111827;">' . htmlspecialchars($fullName) . '</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; font-weight: bold; color: #4b5563;">البريد الإلكتروني:</td>
          <td style="padding: 12px; color: #111827;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #B18E48; text-decoration: none;">' . htmlspecialchars($email) . '</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; font-weight: bold; color: #4b5563;">رقم الهاتف:</td>
          <td style="padding: 12px; color: #111827;"><a href="tel:' . htmlspecialchars($phone) . '" dir="ltr" style="color: #B18E48; text-decoration: none;">' . htmlspecialchars($phone) . '</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; font-weight: bold; color: #4b5563;">تاريخ الإرسال:</td>
          <td style="padding: 12px; color: #6b7280;" dir="ltr">' . date('Y-m-d H:i:s') . '</td>
        </tr>
      </table>

      <div style="background-color: #f9fafb; border-right: 4px solid #ECBD60; padding: 15px; border-radius: 6px;">
        <h4 style="margin: 0 0 10px 0; color: #111827; font-size: 16px;">نص الرسالة:</h4>
        <p style="margin: 0; line-height: 1.6; color: #374151; white-space: pre-line;">' . nl2br(htmlspecialchars($message)) . '</p>
      </div>

      <div style="margin-top: 25px; text-align: center;">
        <a href="https://wa.me/' . preg_replace('/[^0-9]/', '', $phone) . '" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; margin-left: 10px;">
          محادثة عبر واتساب
        </a>
        <a href="mailto:' . htmlspecialchars($email) . '" style="display: inline-block; background-color: #B18E48; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 14px;">
          الرد عبر الإيميل
        </a>
      </div>
    </div>

    <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
      تم إرسال هذا البريد تلقائياً عبر موقع Sameem UPVC (sameemupvc.com).
    </div>

  </div>
</body>
</html>
';

// Standard PHP mail headers with UTF-8 support
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Sameem Website <' . $toEmail . '>';
$headers[] = 'Reply-To: ' . $fullName . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Send email
$mailSent = @mail($toEmail, '=?UTF-8?B?' . base64_encode($subject) . '?=', $emailBody, implode("\r\n", $headers));

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'تم استلام رسالتك بنجاح! سنتواصل معك قريباً.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'تعذر إرسال البريد عبر الخادم. يرجى مراجعة إعدادات البريد.'
    ]);
}

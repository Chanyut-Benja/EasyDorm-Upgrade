# Easy Dorm — Dormitory Management & Resident Service Platform

An interactive, responsive web application prototype designed to streamline dormitory operations for both **Students (Residents)** and **Dormitory Administrators**. Evolved from an iOS Human Interface Design (HID) case study into a full end-to-end interactive web experience.

## Overview

Traditional dormitory management often relies on fragmented channels such as paper bills and manual chat-based maintenance requests, leading to missed updates and slow verification. Easy Dorm centralizes billing, payments, maintenance tracking, and announcements into a single cohesive platform designed with iOS Human Interface Guidelines in mind.

## Key Features

### Student View
- **Authentication & Verification:** Complete sign-in, account registration, and email verification flow.
- **Dashboard & Announcements:** Displays student verification status, room details, quick action shortcuts, and dormitory announcements.
- **Billing & Payment:** Monthly water and electricity utility breakdown, PromptPay QR and Mobile Banking payment options, live countdown timer, and digital payment receipts.
- **Issue Reporting & Rating:** Submit maintenance requests with optional file attachments, track ticket statuses (`Pending` / `Success`), and provide 5-star service ratings with comments.
- **Account Settings:** Manage contact details, notification preferences, and security settings.

### Admin View (Interactive Role Switcher)
- **Live Role Switching:** Toggle seamlessly between Student and Admin views in real time to test end-to-end data synchronization.
- **Maintenance Management:** Update repair ticket statuses (`Pending` to `Success`) and review submitted student feedback and ratings.
- **Payment Verification:** Review and approve submitted student utility payments.
- **Announcement Management:** Publish new dormitory announcements directly to the student dashboard.

## UX Improvements (Post-Evaluation Iteration)
Based on usability testing with target student personas, the following enhancements were implemented in this web version:
1. **Consistent Back Navigation:** Added a persistent back button (`<`) across all sub-screens to prevent navigation dead-ends.
2. **Direct Service Rating Access:** Placed a high-contrast `Evaluate` button directly on completed maintenance cards (`Success`) for immediate user access.
3. **Adaptive Responsive Layout:** Built dedicated layouts for both Desktop (sidebar navigation and multi-column grids) and Mobile (full-screen app interface with drawer navigation).

## Tech Stack
- **Design:** Figma (iOS Human Interface Guidelines)
- **Frontend:** React, Tailwind CSS, Lucide Icons

## Getting Started

1. Clone the repository:
   ```bash
   git clone [https://github.com/Chanyut-Benja/EasyDorm-Upgrade.git](https://github.com/Chanyut-Benja/EasyDorm-Upgrade.git)

/** The photo library used across the inner pages. */

export type Photo = { src: string; alt: string };

export const featurePhotos = {
  frontDeskCall: {
    src: "/images/custom_images/human_missed_calls_1784716295403.png",
    alt: "Dental receptionist smiling on the phone at a front desk with the schedule on screen",
  },
  frontDeskCalendar: {
    src: "/images/custom_images/human_double_bookings_1784716305311.png",
    alt: "Front office team member reviewing a color-coded appointment calendar on a monitor",
  },
  hygieneChair: {
    src: "/images/custom_images/human_hygiene_recalls_1784716317385.png",
    alt: "Dental hygienist talking with a smiling patient in the treatment chair",
  },
  waitingRoomTablet: {
    src: "/images/custom_images/human_patient_intake_1784716328742.png",
    alt: "Patient relaxing in a dental waiting room and filling in a form on a tablet",
  },
  clinicianTablet: {
    src: "/images/custom_images/human_compliance_1784716338567.png",
    alt: "Dentist in navy scrubs reviewing patient information on a tablet in a clinic hallway",
  },
  ownerTablets: {
    src: "/images/custom_images/human_revenue_1784716348606.png",
    alt: "Dental practice owner holding tablets with performance charts at the front desk",
  },
  afterHours: {
    src: "/images/walkthrough_afterhours.png",
    alt: "Dental practice reception at night with the front desk screens still on",
  },
  tabletDashboard: {
    src: "/images/walkthrough_insurance.png",
    alt: "Tablet on a front desk showing a patient's coverage dashboard",
  },
  phoneIntake: {
    src: "/images/walkthrough_intake.png",
    alt: "Patient filling in a digital intake form on a phone in the waiting room",
  },
  performanceMonitor: {
    src: "/images/walkthrough_recall.png",
    alt: "Monitor showing a clinic performance overview with patient and revenue charts",
  },
  tabletIntake: {
    src: "/images/automation_forms.png",
    alt: "Patient signing a digital intake form on a tablet",
  },
  insuranceApproved: {
    src: "/images/automation_insurance.png",
    alt: "Phone showing an insurance approved confirmation in a dental waiting room",
  },
  tabletCalendar: {
    src: "/images/automation_schedule.png",
    alt: "Tablet showing a color-coded dental appointment calendar",
  },
} satisfies Record<string, Photo>;

/** The photo beside each comparison, keyed by the alternative being compared. */
export const comparePhotos = {
  fd: featurePhotos.frontDeskCall,
  bot: featurePhotos.afterHours,
} satisfies Record<string, Photo>;

"use server"

import { Resend } from "resend"
import BookingConfirmationEmail from "@/components/booking-confirmation-email"
import AdminNotificationEmail from "@/components/admin-confirmation-email"

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  serviceType: "startup-growth" | "a-la-carte"
  paymentOption?: "one-time" | "installments"
  selectedServices?: Array<{
    id: string
    name: string
    price: number
  }>
  totalPrice?: number
  discounts?: Array<{
    id: string
    name: string
    amount: number
  }>
  currency?: {
    code: string
    symbol: string
    exchangeRate: number
  }
}

export async function sendBookingConfirmationEmail(formData: FormData) {
  try {
    // Check if RESEND_API_KEY is available
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not defined")
      return {
        success: false,
        error: "Email service configuration is missing",
      }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send confirmation email to the customer
    const customerData = await resend.emails.send({
      from: "Perception Creative Agency <notifications@perceptionuae.store>",
      to: formData.email,
      subject: "Your Booking Confirmation",
      react: BookingConfirmationEmail({ formData }),
    })

    // Send notification email to the admin
    const adminData = await resend.emails.send({
      from: "Perception Creative Agency <notifications@perceptionuae.store>",
      to: "info@perceptionuae.com",
      subject: `New Booking: ${formData.firstName} ${formData.lastName}`,
      react: AdminNotificationEmail({ formData }),
    })

    return { success: true, customerData, adminData }
  } catch (error) {
    // Improved error handling
    console.error("Error sending email:", error)

    // Return a sanitized error message
    return {
      success: false,
      error:
        typeof error === "object" && error !== null && "message" in error
          ? String(error.message)
          : "An unknown error occurred while sending email",
    }
  }
}


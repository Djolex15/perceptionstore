"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define country code type
type CountryCode = {
  code: string
  dial_code: string
  flag: string
  name: string
}

// Comprehensive list of country codes with duplicates removed
const countryCodes: CountryCode[] = [
  { code: "AF", dial_code: "+93", flag: "🇦🇫", name: "Afghanistan" },
  { code: "AL", dial_code: "+355", flag: "🇦🇱", name: "Albania" },
  { code: "DZ", dial_code: "+213", flag: "🇩🇿", name: "Algeria" },
  { code: "AS", dial_code: "+1684", flag: "🇦🇸", name: "American Samoa" },
  { code: "AD", dial_code: "+376", flag: "🇦🇩", name: "Andorra" },
  { code: "AO", dial_code: "+244", flag: "🇦🇴", name: "Angola" },
  { code: "AI", dial_code: "+1264", flag: "🇦🇮", name: "Anguilla" },
  { code: "AQ", dial_code: "+672", flag: "🇦🇶", name: "Antarctica" },
  { code: "AG", dial_code: "+1268", flag: "🇦🇬", name: "Antigua and Barbuda" },
  { code: "AR", dial_code: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "AM", dial_code: "+374", flag: "🇦🇲", name: "Armenia" },
  { code: "AW", dial_code: "+297", flag: "🇦🇼", name: "Aruba" },
  { code: "AU", dial_code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "AT", dial_code: "+43", flag: "🇦🇹", name: "Austria" },
  { code: "AZ", dial_code: "+994", flag: "🇦🇿", name: "Azerbaijan" },
  { code: "BS", dial_code: "+1242", flag: "🇧🇸", name: "Bahamas" },
  { code: "BH", dial_code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "BD", dial_code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "BB", dial_code: "+1246", flag: "🇧🇧", name: "Barbados" },
  { code: "BY", dial_code: "+375", flag: "🇧🇾", name: "Belarus" },
  { code: "BE", dial_code: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "BZ", dial_code: "+501", flag: "🇧🇿", name: "Belize" },
  { code: "BJ", dial_code: "+229", flag: "🇧🇯", name: "Benin" },
  { code: "BM", dial_code: "+1441", flag: "🇧🇲", name: "Bermuda" },
  { code: "BT", dial_code: "+975", flag: "🇧🇹", name: "Bhutan" },
  { code: "BO", dial_code: "+591", flag: "🇧🇴", name: "Bolivia" },
  { code: "BA", dial_code: "+387", flag: "🇧🇦", name: "Bosnia and Herzegovina" },
  { code: "BW", dial_code: "+267", flag: "🇧🇼", name: "Botswana" },
  { code: "BR", dial_code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "IO", dial_code: "+246", flag: "🇮🇴", name: "British Indian Ocean Territory" },
  { code: "BN", dial_code: "+673", flag: "🇧🇳", name: "Brunei Darussalam" },
  { code: "BG", dial_code: "+359", flag: "🇧🇬", name: "Bulgaria" },
  { code: "BF", dial_code: "+226", flag: "🇧🇫", name: "Burkina Faso" },
  { code: "BI", dial_code: "+257", flag: "🇧🇮", name: "Burundi" },
  { code: "KH", dial_code: "+855", flag: "🇰🇭", name: "Cambodia" },
  { code: "CM", dial_code: "+237", flag: "🇨🇲", name: "Cameroon" },
  { code: "CA", dial_code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "CV", dial_code: "+238", flag: "🇨🇻", name: "Cape Verde" },
  { code: "KY", dial_code: "+1345", flag: "🇰🇾", name: "Cayman Islands" },
  { code: "CF", dial_code: "+236", flag: "🇨🇫", name: "Central African Republic" },
  { code: "TD", dial_code: "+235", flag: "🇹🇩", name: "Chad" },
  { code: "CL", dial_code: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "CN", dial_code: "+86", flag: "🇨🇳", name: "China" },
  { code: "CO", dial_code: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "KM", dial_code: "+269", flag: "🇰🇲", name: "Comoros" },
  { code: "CG", dial_code: "+242", flag: "🇨🇬", name: "Congo" },
  { code: "CD", dial_code: "+243", flag: "🇨🇩", name: "Congo, Democratic Republic" },
  { code: "CK", dial_code: "+682", flag: "🇨🇰", name: "Cook Islands" },
  { code: "CR", dial_code: "+506", flag: "🇨🇷", name: "Costa Rica" },
  { code: "CI", dial_code: "+225", flag: "🇨🇮", name: "Cote d'Ivoire" },
  { code: "HR", dial_code: "+385", flag: "🇭🇷", name: "Croatia" },
  { code: "CU", dial_code: "+53", flag: "🇨🇺", name: "Cuba" },
  { code: "CY", dial_code: "+357", flag: "🇨🇾", name: "Cyprus" },
  { code: "CZ", dial_code: "+420", flag: "🇨🇿", name: "Czech Republic" },
  { code: "DK", dial_code: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "DJ", dial_code: "+253", flag: "🇩🇯", name: "Djibouti" },
  { code: "DM", dial_code: "+1767", flag: "🇩🇲", name: "Dominica" },
  { code: "DO", dial_code: "+1849", flag: "🇩🇴", name: "Dominican Republic" },
  { code: "EC", dial_code: "+593", flag: "🇪🇨", name: "Ecuador" },
  { code: "EG", dial_code: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "SV", dial_code: "+503", flag: "🇸🇻", name: "El Salvador" },
  { code: "GQ", dial_code: "+240", flag: "🇬🇶", name: "Equatorial Guinea" },
  { code: "ER", dial_code: "+291", flag: "🇪🇷", name: "Eritrea" },
  { code: "EE", dial_code: "+372", flag: "🇪🇪", name: "Estonia" },
  { code: "ET", dial_code: "+251", flag: "🇪🇹", name: "Ethiopia" },
  { code: "FK", dial_code: "+500", flag: "🇫🇰", name: "Falkland Islands" },
  { code: "FO", dial_code: "+298", flag: "🇫🇴", name: "Faroe Islands" },
  { code: "FJ", dial_code: "+679", flag: "🇫🇯", name: "Fiji" },
  { code: "FI", dial_code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "FR", dial_code: "+33", flag: "🇫🇷", name: "France" },
  { code: "GF", dial_code: "+594", flag: "🇬🇫", name: "French Guiana" },
  { code: "PF", dial_code: "+689", flag: "🇵🇫", name: "French Polynesia" },
  { code: "GA", dial_code: "+241", flag: "🇬🇦", name: "Gabon" },
  { code: "GM", dial_code: "+220", flag: "🇬🇲", name: "Gambia" },
  { code: "GE", dial_code: "+995", flag: "🇬🇪", name: "Georgia" },
  { code: "DE", dial_code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "GH", dial_code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "GI", dial_code: "+350", flag: "🇬🇮", name: "Gibraltar" },
  { code: "GR", dial_code: "+30", flag: "🇬🇷", name: "Greece" },
  { code: "GL", dial_code: "+299", flag: "🇬🇱", name: "Greenland" },
  { code: "GD", dial_code: "+1473", flag: "🇬🇩", name: "Grenada" },
  { code: "GP", dial_code: "+590", flag: "🇬🇵", name: "Guadeloupe" },
  { code: "GU", dial_code: "+1671", flag: "🇬🇺", name: "Guam" },
  { code: "GT", dial_code: "+502", flag: "🇬🇹", name: "Guatemala" },
  { code: "GN", dial_code: "+224", flag: "🇬🇳", name: "Guinea" },
  { code: "GW", dial_code: "+245", flag: "🇬🇼", name: "Guinea-Bissau" },
  { code: "GY", dial_code: "+592", flag: "🇬🇾", name: "Guyana" },
  { code: "HT", dial_code: "+509", flag: "🇭🇹", name: "Haiti" },
  { code: "VA", dial_code: "+379", flag: "🇻🇦", name: "Holy See (Vatican City)" },
  { code: "HN", dial_code: "+504", flag: "🇭🇳", name: "Honduras" },
  { code: "HK", dial_code: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "HU", dial_code: "+36", flag: "🇭🇺", name: "Hungary" },
  { code: "IS", dial_code: "+354", flag: "🇮🇸", name: "Iceland" },
  { code: "IN", dial_code: "+91", flag: "🇮🇳", name: "India" },
  { code: "ID", dial_code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "IR", dial_code: "+98", flag: "🇮🇷", name: "Iran" },
  { code: "IQ", dial_code: "+964", flag: "🇮🇶", name: "Iraq" },
  { code: "IE", dial_code: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "IL", dial_code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "IT", dial_code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "JM", dial_code: "+1876", flag: "🇯🇲", name: "Jamaica" },
  { code: "JP", dial_code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "JO", dial_code: "+962", flag: "🇯🇴", name: "Jordan" },
  { code: "KZ", dial_code: "+7", flag: "🇰🇿", name: "Kazakhstan" },
  { code: "KE", dial_code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "KI", dial_code: "+686", flag: "🇰🇮", name: "Kiribati" },
  { code: "KP", dial_code: "+850", flag: "🇰🇵", name: "North Korea" },
  { code: "KR", dial_code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "KW", dial_code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "KG", dial_code: "+996", flag: "🇰🇬", name: "Kyrgyzstan" },
  { code: "LA", dial_code: "+856", flag: "🇱🇦", name: "Laos" },
  { code: "LV", dial_code: "+371", flag: "🇱🇻", name: "Latvia" },
  { code: "LB", dial_code: "+961", flag: "🇱🇧", name: "Lebanon" },
  { code: "LS", dial_code: "+266", flag: "🇱🇸", name: "Lesotho" },
  { code: "LR", dial_code: "+231", flag: "🇱🇷", name: "Liberia" },
  { code: "LY", dial_code: "+218", flag: "🇱🇾", name: "Libya" },
  { code: "LI", dial_code: "+423", flag: "🇱🇮", name: "Liechtenstein" },
  { code: "LT", dial_code: "+370", flag: "🇱🇹", name: "Lithuania" },
  { code: "LU", dial_code: "+352", flag: "🇱🇺", name: "Luxembourg" },
  { code: "MO", dial_code: "+853", flag: "🇲🇴", name: "Macao" },
  { code: "MK", dial_code: "+389", flag: "🇲🇰", name: "North Macedonia" },
  { code: "MG", dial_code: "+261", flag: "🇲🇬", name: "Madagascar" },
  { code: "MW", dial_code: "+265", flag: "🇲🇼", name: "Malawi" },
  { code: "MY", dial_code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "MV", dial_code: "+960", flag: "🇲🇻", name: "Maldives" },
  { code: "ML", dial_code: "+223", flag: "🇲🇱", name: "Mali" },
  { code: "MT", dial_code: "+356", flag: "🇲🇹", name: "Malta" },
  { code: "MH", dial_code: "+692", flag: "🇲🇭", name: "Marshall Islands" },
  { code: "MQ", dial_code: "+596", flag: "🇲🇶", name: "Martinique" },
  { code: "MR", dial_code: "+222", flag: "🇲🇷", name: "Mauritania" },
  { code: "MU", dial_code: "+230", flag: "🇲🇺", name: "Mauritius" },
  { code: "MX", dial_code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "FM", dial_code: "+691", flag: "🇫🇲", name: "Micronesia" },
  { code: "MD", dial_code: "+373", flag: "🇲🇩", name: "Moldova" },
  { code: "MC", dial_code: "+377", flag: "🇲🇨", name: "Monaco" },
  { code: "MN", dial_code: "+976", flag: "🇲🇳", name: "Mongolia" },
  { code: "ME", dial_code: "+382", flag: "🇲🇪", name: "Montenegro" },
  { code: "MS", dial_code: "+1664", flag: "🇲🇸", name: "Montserrat" },
  { code: "MA", dial_code: "+212", flag: "🇲🇦", name: "Morocco" },
  { code: "MZ", dial_code: "+258", flag: "🇲🇿", name: "Mozambique" },
  { code: "MM", dial_code: "+95", flag: "🇲🇲", name: "Myanmar" },
  { code: "NA", dial_code: "+264", flag: "🇳🇦", name: "Namibia" },
  { code: "NR", dial_code: "+674", flag: "🇳🇷", name: "Nauru" },
  { code: "NP", dial_code: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "NL", dial_code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "NC", dial_code: "+687", flag: "🇳🇨", name: "New Caledonia" },
  { code: "NZ", dial_code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "NI", dial_code: "+505", flag: "🇳🇮", name: "Nicaragua" },
  { code: "NE", dial_code: "+227", flag: "🇳🇪", name: "Niger" },
  { code: "NG", dial_code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "NU", dial_code: "+683", flag: "🇳🇺", name: "Niue" },
  { code: "MP", dial_code: "+1670", flag: "🇲🇵", name: "Northern Mariana Islands" },
  { code: "NO", dial_code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "OM", dial_code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "PK", dial_code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "PW", dial_code: "+680", flag: "🇵🇼", name: "Palau" },
  { code: "PS", dial_code: "+970", flag: "🇵🇸", name: "Palestine" },
  { code: "PA", dial_code: "+507", flag: "🇵🇦", name: "Panama" },
  { code: "PG", dial_code: "+675", flag: "🇵🇬", name: "Papua New Guinea" },
  { code: "PY", dial_code: "+595", flag: "🇵🇾", name: "Paraguay" },
  { code: "PE", dial_code: "+51", flag: "🇵🇪", name: "Peru" },
  { code: "PH", dial_code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "PL", dial_code: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "PT", dial_code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "PR", dial_code: "+1939", flag: "🇵🇷", name: "Puerto Rico" },
  { code: "QA", dial_code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "RO", dial_code: "+40", flag: "🇷🇴", name: "Romania" },
  { code: "RU", dial_code: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "RW", dial_code: "+250", flag: "🇷🇼", name: "Rwanda" },
  { code: "KN", dial_code: "+1869", flag: "🇰🇳", name: "Saint Kitts and Nevis" },
  { code: "LC", dial_code: "+1758", flag: "🇱🇨", name: "Saint Lucia" },
  { code: "VC", dial_code: "+1784", flag: "🇻🇨", name: "Saint Vincent and the Grenadines" },
  { code: "WS", dial_code: "+685", flag: "🇼🇸", name: "Samoa" },
  { code: "SM", dial_code: "+378", flag: "🇸🇲", name: "San Marino" },
  { code: "ST", dial_code: "+239", flag: "🇸🇹", name: "Sao Tome and Principe" },
  { code: "SA", dial_code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "SN", dial_code: "+221", flag: "🇸🇳", name: "Senegal" },
  { code: "RS", dial_code: "+381", flag: "🇷🇸", name: "Serbia" },
  { code: "SC", dial_code: "+248", flag: "🇸🇨", name: "Seychelles" },
  { code: "SL", dial_code: "+232", flag: "🇸🇱", name: "Sierra Leone" },
  { code: "SG", dial_code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "SK", dial_code: "+421", flag: "🇸🇰", name: "Slovakia" },
  { code: "SI", dial_code: "+386", flag: "🇸🇮", name: "Slovenia" },
  { code: "SB", dial_code: "+677", flag: "🇸🇧", name: "Solomon Islands" },
  { code: "SO", dial_code: "+252", flag: "🇸🇴", name: "Somalia" },
  { code: "ZA", dial_code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "SS", dial_code: "+211", flag: "🇸🇸", name: "South Sudan" },
  { code: "ES", dial_code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "LK", dial_code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "SD", dial_code: "+249", flag: "🇸🇩", name: "Sudan" },
  { code: "SR", dial_code: "+597", flag: "🇸🇷", name: "Suriname" },
  { code: "SZ", dial_code: "+268", flag: "🇸🇿", name: "Eswatini" },
  { code: "SE", dial_code: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "CH", dial_code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "SY", dial_code: "+963", flag: "🇸🇾", name: "Syrian Arab Republic" },
  { code: "TW", dial_code: "+886", flag: "🇹🇼", name: "Taiwan" },
  { code: "TJ", dial_code: "+992", flag: "🇹🇯", name: "Tajikistan" },
  { code: "TZ", dial_code: "+255", flag: "🇹🇿", name: "Tanzania" },
  { code: "TH", dial_code: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "TL", dial_code: "+670", flag: "🇹🇱", name: "Timor-Leste" },
  { code: "TG", dial_code: "+228", flag: "🇹🇬", name: "Togo" },
  { code: "TK", dial_code: "+690", flag: "🇹🇰", name: "Tokelau" },
  { code: "TO", dial_code: "+676", flag: "🇹🇴", name: "Tonga" },
  { code: "TT", dial_code: "+1868", flag: "🇹🇹", name: "Trinidad and Tobago" },
  { code: "TN", dial_code: "+216", flag: "🇹🇳", name: "Tunisia" },
  { code: "TR", dial_code: "+90", flag: "🇹🇷", name: "Turkey" },
  { code: "TM", dial_code: "+993", flag: "🇹🇲", name: "Turkmenistan" },
  { code: "TC", dial_code: "+1649", flag: "🇹🇨", name: "Turks and Caicos Islands" },
  { code: "TV", dial_code: "+688", flag: "🇹🇻", name: "Tuvalu" },
  { code: "UG", dial_code: "+256", flag: "🇺🇬", name: "Uganda" },
  { code: "UA", dial_code: "+380", flag: "🇺🇦", name: "Ukraine" },
  { code: "AE", dial_code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "GB", dial_code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "US", dial_code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "UY", dial_code: "+598", flag: "🇺🇾", name: "Uruguay" },
  { code: "UZ", dial_code: "+998", flag: "🇺🇿", name: "Uzbekistan" },
  { code: "VU", dial_code: "+678", flag: "🇻🇺", name: "Vanuatu" },
  { code: "VE", dial_code: "+58", flag: "🇻🇪", name: "Venezuela" },
  { code: "VN", dial_code: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "VG", dial_code: "+1284", flag: "🇻🇬", name: "Virgin Islands, British" },
  { code: "VI", dial_code: "+1340", flag: "🇻🇮", name: "Virgin Islands, U.S." },
  { code: "WF", dial_code: "+681", flag: "🇼🇫", name: "Wallis and Futuna" },
  { code: "YE", dial_code: "+967", flag: "🇾🇪", name: "Yemen" },
  { code: "ZM", dial_code: "+260", flag: "🇿🇲", name: "Zambia" },
  { code: "ZW", dial_code: "+263", flag: "🇿🇼", name: "Zimbabwe" },
]

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
}

export default function PhoneInput({ value, onChange }: PhoneInputProps) {
  const [countryCode, setCountryCode] = useState<string>("+1")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const initialLoadRef = useRef(true)
  const countryDetectedRef = useRef(false)

  // Detect user's country on component mount
  useEffect(() => {
    if (countryDetectedRef.current) return

    const detectCountry = async () => {
      try {
        console.log("Attempting to detect country...")

        // Try using a free API that doesn't require authentication
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()

        console.log("Country detection response:", data)

        if (data && data.country_calling_code) {
          // Use the country_calling_code directly from the API
          const dialCode = data.country_calling_code
          console.log("Country calling code detected:", dialCode)

          // Check if this dial code exists in our countryCodes array
          const country = countryCodes.find((c) => c.dial_code === dialCode)
          if (country) {
            console.log("Country matched in our list:", country.name)
            setCountryCode(dialCode)
            countryDetectedRef.current = true
            return
          } else {
            console.log("Dial code not found in our list, using as is")
            setCountryCode(dialCode)
            countryDetectedRef.current = true
            return
          }
        } else if (data && data.country_code) {
          // Fallback to using country code if calling code is not available
          const country = countryCodes.find((c) => c.code === data.country_code)
          if (country) {
            console.log("Country detected from code:", country.name, country.dial_code)
            setCountryCode(country.dial_code)
            countryDetectedRef.current = true
            return
          }
        }
      } catch (error) {
        console.error("Error detecting country from API:", error)
      }

      // Fallback to browser's navigator.language
      try {
        console.log("Falling back to browser language detection")
        const browserLang = navigator.language || (navigator as any).userLanguage
        console.log("Browser language:", browserLang)

        if (browserLang) {
          const countryCode = browserLang.split("-")[1]
          console.log("Extracted country code:", countryCode)

          const country = countryCodes.find((c) => c.code === countryCode)
          if (country) {
            console.log("Country detected from browser:", country.name, country.dial_code)
            setCountryCode(country.dial_code)
            countryDetectedRef.current = true
          } else {
            console.log("No matching country found for code:", countryCode)
          }
        }
      } catch (e) {
        console.error("Fallback country detection failed:", e)
      }
    }

    detectCountry()
  }, [])

  // Parse existing value if provided (only on initial load)
  useEffect(() => {
    if (!initialLoadRef.current) return

    if (value) {
      // Find the country code in the value
      const foundCountry = countryCodes.find((country) => value.startsWith(country.dial_code))

      if (foundCountry) {
        setCountryCode(foundCountry.dial_code)
        setPhoneNumber(value.substring(foundCountry.dial_code.length).trim())
      } else {
        setPhoneNumber(value)
      }

      initialLoadRef.current = false
    }
  }, [value])

  // Handle country code change
  const handleCountryCodeChange = (newCode: string) => {
    setCountryCode(newCode)
    // Update the parent component with the new combined value
    const combinedValue = `${newCode} ${phoneNumber}`.trim()
    onChange(combinedValue)
  }

  // Handle phone number input change
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    // Only allow digits, spaces, and dashes
    const sanitizedInput = input.replace(/[^\d\s-]/g, "")
    setPhoneNumber(sanitizedInput)

    // Update the parent component with the new combined value
    const combinedValue = `${countryCode} ${sanitizedInput}`.trim()
    onChange(combinedValue)
  }

  return (
    <div className="flex">
      <Select value={countryCode} onValueChange={handleCountryCodeChange}>
        <SelectTrigger className="w-[110px] border-r-0 rounded-r-none">
          <SelectValue placeholder={countryCode} />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {countryCodes.map((country) => (
            <SelectItem key={`${country.code}-${country.dial_code}`} value={country.dial_code}>
              <div className="flex items-center">
                <span className="mr-2">{country.flag}</span>
                <span>{country.dial_code}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        className="flex-1 rounded-l-none"
        placeholder="Phone number"
        required
      />
    </div>
  )
}


"use client"

import { useI18n } from "@/components/i18n-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { useEffect, useState } from "react"

export function ProfileSettings() {
  const { t } = useI18n()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [bio, setBio] = useState("")

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedName = localStorage.getItem("profileName")
    const savedEmail = localStorage.getItem("profileEmail")
    const savedPhone = localStorage.getItem("profilePhone")
    const savedBio = localStorage.getItem("profileBio")
    
    if (savedName) setName(savedName)
    if (savedEmail) setEmail(savedEmail)
    if (savedPhone) setPhone(savedPhone)
    if (savedBio) setBio(savedBio)
  }, [])

  // Save profile data to localStorage when it changes
  const saveProfile = () => {
    localStorage.setItem("profileName", name)
    localStorage.setItem("profileEmail", email)
    localStorage.setItem("profilePhone", phone)
    localStorage.setItem("profileBio", bio)
    alert(t("Profile updated successfully!"))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2 text-indigo-500" />
          {t("Profile Settings")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">{t("Full Name")}</Label>
          <Input 
            id="name" 
            placeholder={t("Enter your full name")} 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">{t("Email Address")}</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder={t("Enter your email address")} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">{t("Phone Number")}</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder={t("Enter your phone number")} 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">{t("Bio")}</Label>
          <Textarea 
            id="bio" 
            placeholder={t("Tell us about yourself")} 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end">
          <Button onClick={saveProfile}>{t("Save Changes")}</Button>
        </div>
      </CardContent>
    </Card>
  )
}
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoginComponent } from "@/app/features/login"

export default function Home() {
  return (
    <div className= "">
      <Button size="lg"> Primary 1</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant ="ghost">Ghost</Button>
      <Button variant="secondary"> Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="muted">muted</Button>
      <Button variant= "teritary">teritraty</Button>
      <Input></Input>
      <LoginComponent />
    </div>
    
  )
}
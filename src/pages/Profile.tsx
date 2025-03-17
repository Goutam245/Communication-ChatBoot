import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Camera, Mail, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "@/components/Avatar";
import { currentUser } from "@/utils/data";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
      <div className="max-w-2xl mx-auto bg-white min-h-screen shadow-xl">
        <div className="border-b p-4 flex items-center gap-4">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>

        <div className="p-4 space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar user={currentUser} size="lg" />
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full">
                <Camera size={16} />
              </button>
            </div>
            <h2 className="text-xl font-semibold">{currentUser.name}</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                Name
              </Label>
              <Input id="name" defaultValue={currentUser.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500" />
                Email
              </Label>
              <Input id="email" type="email" defaultValue="user@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500" />
                Phone
              </Label>
              <Input id="phone" type="tel" defaultValue="+1 234 567 890" />
            </div>
          </div>

          <Button className="w-full mt-4">Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

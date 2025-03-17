
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bell, Moon, Shield, Smartphone, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
      <div className="max-w-2xl mx-auto bg-white min-h-screen shadow-xl">
        <div className="border-b p-4 flex items-center gap-4">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>

        <div className="p-4 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="text-gray-500" />
                  <Label htmlFor="notifications">Push notifications</Label>
                </div>
                <Switch id="notifications" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="text-gray-500" />
                  <Label htmlFor="sound">Sound</Label>
                </div>
                <Switch id="sound" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">Appearance</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="text-gray-500" />
                <Label htmlFor="dark-mode">Dark mode</Label>
              </div>
              <Switch id="dark-mode" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">Privacy</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="text-gray-500" />
                  <Label htmlFor="read-receipts">Read receipts</Label>
                </div>
                <Switch id="read-receipts" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="text-gray-500" />
                  <Label htmlFor="online-status">Online status</Label>
                </div>
                <Switch id="online-status" defaultChecked />
              </div>
            </div>
          </div>

          <Button variant="destructive" className="w-full mt-8">
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

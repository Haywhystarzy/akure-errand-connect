
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Clock, DollarSign } from 'lucide-react';

interface CreateErrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const akureAreas = [
  'Alagbaka', 'Aule', 'Ayedun', 'Oba-Ile', 'Ilesa Road', 'Ondo Road',
  'Ijapo', 'Ijoka', 'Ikere Road', 'Isikan', 'Orita Obele', 'FUTA Area',
  'Shagari Village', 'Igoba', 'Isolo Road'
];

const categories = [
  'Delivery', 'Shopping', 'Cleaning', 'Help at Home', 'Custom Task'
];

const CreateErrandModal = ({ isOpen, onClose, onSuccess }: CreateErrandModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    area: '',
    preferredTime: '',
    reward: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Creating errand:', formData);
      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Post New Errand</DialogTitle>
          <DialogDescription>
            Create a new errand for ErrandGo runners in Akure to apply for
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Errand Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Buy Recharge Card, Deliver Package..."
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select errand category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide clear details about what needs to be done, any specific requirements, contact information if needed..."
              rows={4}
              required
            />
          </div>

          {/* Area */}
          <div className="space-y-2">
            <Label htmlFor="area">Area in Akure *</Label>
            <Select value={formData.area} onValueChange={(value) => setFormData({ ...formData, area: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select area in Akure" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {akureAreas.map(area => (
                  <SelectItem key={area} value={area}>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      {area}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Time */}
          <div className="space-y-2">
            <Label htmlFor="preferredTime">Preferred Time</Label>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <Input
                id="preferredTime"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                placeholder="e.g., Today evening, Tomorrow morning, This weekend..."
              />
            </div>
          </div>

          {/* Estimated Reward */}
          <div className="space-y-2">
            <Label htmlFor="reward">Estimated Reward (Optional)</Label>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <Input
                id="reward"
                value={formData.reward}
                onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                placeholder="e.g., ₦500, ₦1000..."
              />
            </div>
            <p className="text-sm text-gray-500">
              You can negotiate the final amount with the selected runner
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !formData.title || !formData.description || !formData.category || !formData.area}
              className="flex-1"
            >
              {isSubmitting ? 'Posting...' : 'Post Errand'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateErrandModal;

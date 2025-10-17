import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface TourSlot {
  productId?: string;
  optionId?: string;
  nextStartISO: string;
  status: string;
  filled?: number;
  capacity?: number;
  vacancies?: number;
  price: number;
}

interface NextAvailableButtonProps {
  productId: string;
  currentTourIndex: number;
  allToursForProduct: TourSlot[];
  onTourChange: (productId: string, direction: 'next' | 'prev') => void;
}

export function NextAvailableButton({ 
  productId,
  currentTourIndex, 
  allToursForProduct,
  onTourChange
}: NextAvailableButtonProps) {
  const handleNextAvailable = () => {
    // Find the next available tour (not sold out) for this product
    let nextIndex = currentTourIndex;
    
    for (let i = currentTourIndex + 1; i < allToursForProduct.length; i++) {
      if (allToursForProduct[i].status !== "SOLD_OUT") {
        nextIndex = i;
        break;
      }
    }
    
    // If we found a different tour, navigate to it
    if (nextIndex !== currentTourIndex) {
      // Calculate how many steps to move forward
      const steps = nextIndex - currentTourIndex;
      for (let i = 0; i < steps; i++) {
        setTimeout(() => {
          onTourChange(productId, 'next');
        }, i * 50); // Small delay between each step for smooth animation
      }
    }
  };

  // Check if there are any available tours after current one
  const hasNextAvailable = allToursForProduct.some((tour, index) => 
    index > currentTourIndex && tour.status !== "SOLD_OUT"
  );

  if (!hasNextAvailable) {
    return null; // Don't show button if no available tours
  }

  return (
    <Button
      onClick={handleNextAvailable}
      variant="outline"
      size="sm"
      className="h-8 px-3 text-xs bg-teal-50 border-teal-200 hover:bg-teal-100 hover:border-teal-300"
      style={{ color: '#172554' }}
    >
      <ArrowRight className="w-3 h-3 mr-1" />
      Next Available
    </Button>
  );
}
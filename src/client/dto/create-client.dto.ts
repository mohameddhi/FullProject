import { IsNotEmpty, IsOptional, IsString, IsObject } from 'class-validator';
import { Client} from 'src/shared/schema/client';
    export class CreateClientDto{
     
      reference: string;
    
     
      name: string;
    
      
      categoryReference: string;
    
      
      customerCategory: {
        id: number;
        reference: string;
        name: string;
        href: string;
      };
    
      
      customerSegmentationReference: string;
    
     
      customerSegmentation: {
        id: number;
        reference: string;
        name: string;
        href: string;
      };
    
      billingCountry: string;
    
      
      billingCity: string;
    
     
      billingPostalCode?: string;
    
      
      billingAddress?: string;
    
      organization: string;
    
      
      region?: string;
    }
    

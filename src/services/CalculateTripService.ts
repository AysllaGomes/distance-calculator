import { ServiceValidator } from "../validators/Service.validator";

export class CalculateTripService {
  private serviceValidator = new ServiceValidator();

  public async calculateTrip(body: any): Promise<any> {
    console.log('body', body);

  }

}

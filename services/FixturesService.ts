
import { axiosInstance } from ".";

export default class Fixtures {
  /**
  * fethAllFixtures
  * competition: somprtition type e.g epl
  * round: match weel eg 3
  */
  public static fetchAllFixtures(competition: string, round: string): void {
    axiosInstance.get(`competition/${competition}/fixture?round=${round}`)
      .then(res => {
        return res;
      })
      .catch(error => {
        console.error(error);
        return error;
      })
  }
}

// this fle is an experiment, it doesn't hurt to leave it for now
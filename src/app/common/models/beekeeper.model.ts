import {LocationBasedModel} from './location-based.model';
import '@firebase/firestore';
import firebase from '@firebase/app';


export class BeeKeeper extends LocationBasedModel {

  public email = '';
  public firstname = '';
  public surname = '';
  public streetname = '';
  public streetnr = '';
  public postcode = '';
  public place = '';
  public country = '';

  /**
   * Constructor. Due to the order in which super/subclasses are initialized
   * we have to call ``inflate`` explicitly for this subclass in order
   * to have all fields of the subclass properly initialized.
   * (see http://joelleach.net/2016/11/18/setting-subclass-properties-in-typescript/ for further details)
   *
   * @param data Serialized data to be used for instance inflation
   */
  public constructor(data: any) {
    super(data);
    this.inflate(data);
  }
}

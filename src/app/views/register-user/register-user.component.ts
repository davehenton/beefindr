import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BeeKeeper } from '../../common/models/beekeeper.model';
import { InjectableBeekeeperService } from '../../common/services/injectable-services.service';
import { MatInput } from '@angular/material/input';
import { Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  providers: [InjectableBeekeeperService, AngularFirestore]
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;

  @ViewChild('namefocus') nameInput: MatInput;

  constructor(private formBuilder: FormBuilder,
              private beeKeeperService: InjectableBeekeeperService, public snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      streetname: ['', [Validators.required, Validators.pattern('^[ a-zA-ZäöüÄÖÜé.-]+$')]],
      streetnr: ['', [Validators.required, Validators.pattern('^[ a-zA-Z0-9]+$')]],
      postcode: ['', [Validators.required, Validators.pattern('^[ a-zA-Z0-9]+$')]],
      place: ['', [Validators.required, Validators.pattern('^[ a-zA-Z0-9äöüÄÖÜé.-]+$')]],
      country: ['', [Validators.required, Validators.pattern('^[ a-zA-ZäöüÄÖÜé.-]+$')]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.beeKeeperService.createItem(new BeeKeeper(
      {
        firstname: this.f.firstname.value,
        surname: this.f.surname.value,
        streetname: this.f.streetname.value,
        streetnr: this.f.streetnr.value,
        postcode: this.f.postcode.value,
        place: this.f.place.value,
        country: this.f.country.value,
        email: this.f.email.value,
        location: {
          latitude: 11,
          longitude: 11
        }
      })).then(() => {
        console.log('created');
        this.snackBar.open('Danke für Ihre Registrierung bei BeeFinder!', 'Close', {
          duration: 20000,
        });
        this.router.navigate(['/']);
      }).catch( error => {
        // handle error
        this.registerForm.reset();
        this.nameInput.focus();
        this.snackBar.open('Registrierung hat leider nicht geklappt!', 'Close', {
          duration: 20000,
        });
     });
  }

}

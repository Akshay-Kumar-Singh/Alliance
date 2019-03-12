import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BeaconService } from '../beacon.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  constructor(
    private service: BeaconService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
  allNodes: any[] = [];

  ngOnInit() {
    this.getAllNode();
  }

  addBeaconForm = new FormGroup({
    beacon_id: new FormControl('', [Validators.required]),
    location_x: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9|.]*$/)
    ]),
    location_y: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9|.]*$/)
    ]),
    description: new FormControl('', [Validators.required]),
    adjacent_node: new FormControl('')
  });

  getAllNode() {
    this.spinner.show();
    this.service.getAllNodes().subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.allNodes = res['data'];
    });
  }

  onSubmit() {
    const nodes = this.addBeaconForm.value.adjacent_node.toString();
    this.addBeaconForm.value.adjacent_node = nodes;
    console.log(this.addBeaconForm.value)
    this.spinner.show();
    this.service.addBeacon(this.addBeaconForm.value).subscribe(res => {
    this.spinner.hide();
    if(res['responseCode'] === 200){
    this.router.navigate(['view-all']);
    alert(res['responseMessage']);
    } else {
    alert(res['responseMessage']);
    }
    console.log(res);
    });
    }
}

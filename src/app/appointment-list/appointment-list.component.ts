import { Component } from '@angular/core';

// Importing the interface so we can use it in the component
import { Appointment } from '../models/appointment';
// Lifecycle hook
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
// Export it so we can import it in the module
export class AppointmentListComponent implements OnInit{

  
  // Create properties 
  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();

  // Using are interface to create an array
  appointments: Appointment[] = [];

   // Doesn't return anythign since there a void
   // Used for loading data when the component gets created
  ngOnInit(): void {
    // Seeing if there is any saved appointments and trying to load it from local storage
    let savedAppointments = localStorage.getItem('appointments')
    // Checking if we have a have a value and if there is the first value with get loaded and if we dont have an appointment so lets create an empty array
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : []
  }

  // Creating a method for our submit
  addAppointment(){
    // Remove leading and trailing white spaces
    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate){
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }
      // pushing it into the Appointment array
      this.appointments.push(newAppointment);

      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();

      // Digging into the local storage so we can save the appointment
      localStorage.setItem("appointments", JSON.stringify(this.appointments))
      // Make sure its working
      // alert(this.appointments.length)
    }
  }
  
  // Creating a method to remove
  deleteAppointment(index: number) {
    this.appointments.splice(index, 1)
    //Update it and save the new array
    localStorage.setItem("appointments", JSON.stringify(this.appointments))
  }
  
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { NatureMission } from './domains';
import {environment} from '../environments/environment';
import { Observable, from } from 'rxjs';

const URL_BACKEND = environment.baseUrl;

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class TransportService{

}
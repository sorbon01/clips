import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import IUser from '../models/user.model';
import { delay, map, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userCollection: AngularFirestoreCollection<IUser>
  public isAuthentication$ : Observable<boolean>
  public isAuthenticatedWithDelay$ : Observable<boolean>

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router:Router

    ) { 
      this.userCollection = db.collection('users')
      this.isAuthentication$ = auth.user.pipe(
        map(user => !!user)
      )
      this.isAuthenticatedWithDelay$= this.isAuthentication$.pipe(delay(1000))
    }

  public async createUser(userData:IUser) {

    if (!userData.password){
      throw new Error("Password not provided")
    }

    const userCred = await this.auth.createUserWithEmailAndPassword
    (
      userData.email,
      userData.password
    )

    if (!userCred.user)
      throw new Error("User can't found")  

    await this.userCollection.doc(userCred.user.uid).set({
      name:userData.name,
      email:userData.email,
      age:userData.age,
      phoneNumber:userData.phoneNumber,
    })

    userCred.user.updateProfile({
      displayName: userData.name
    })
  }
  
  public async logout($event:Event){
    if($event)
      $event.preventDefault()
    await this.auth.signOut();

    await this.router.navigate(["/"]); //render no worked (Problem)
  }
}

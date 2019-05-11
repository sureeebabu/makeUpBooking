import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import{ Reference } from '@firebase/database-types';
import{ User, AuthCredential } from '@firebase/auth-types';

//let keys = [];

@Injectable()
export class AdminProfileProvider {
	
	public fireAuth: any;
	public email: string;
	userList: any;
	public userProfile: Reference;
  public currentUser: User
	
	constructor(public http: Http) {

		console.log('Hello UserServiceProvider Provider');
		this.fireAuth = firebase.auth();
		this.userList = firebase.database().ref('/adminProfile' );
   
    firebase.auth().onAuthStateChanged( user=> {
        if(user){this.currentUser = user;
       this.userProfile = firebase.database().ref(`/adminProfile/${user.uid}`)
     }
   });
  
	}

	getUsersProfile(id): any {
		return this.userList.child(id);
	  }

	  getUserList(): any{
		return this.userList;
	  }

	  deleteUser(id){
		return this.userList.child(id).remove();
		
		}
		

    signupUser(email:string, password:string): Promise<any> {
		  return firebase.auth()
		  .createUserWithEmailAndPassword(email, password)
          .then(newUser => {
            firebase.database().ref(`/adminProfile/${newUser.uid}/email`)
            .set(email);
              })
           .catch(error => {
         console.error(error);
		 throw new Error (error);
		});
	}
  
	loginUser( email:string, password:string): Promise<any> {
         return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	forgotPass(email: string): any {
		return this.fireAuth.sendPasswordResetEmail(email);
	  }

	logoutUser(): Promise<void> {
      const userId:string = firebase.auth().currentUser.uid;
	   firebase.database().ref(`/adminProfile/${userId}`)
	   .off();
		 return firebase.auth().signOut();
	}

	getUserProfile(): Reference {
		return this.userProfile;
	}

	getuser(userid: any){
	let userRef = this.userProfile.child(userid);
	return userRef.once('value');
}


	updateName( firstname: string, lastname: string): Promise<any>{
		return this.userProfile.update({firstname, lastname});
	}

	updatePicture( downloadURL:any): Promise<any>{
		return this.userProfile.update({downloadURL});
	}


	updatePhone( phone:number ): Promise<any> {
		return this.userProfile.update({phone});
	}

	updateAddress( address:string ): Promise<any> {
		return this.userProfile.update({address});
	}

	updateDOB( birthday:string ): Promise<any> {
			return this.userProfile.update({birthday});
	}

	updateEmail( newEmail:string, password: string): Promise<any> {
		 const credential: AuthCredential = firebase.auth.
				EmailAuthProvider.credential(
					 this.currentUser.email,
						password
					);
			return this.currentUser
			.reauthenticateWithCredential(credential)
			 .then(user => {
						this.currentUser.updateEmail(newEmail).then(user => {
							this.userProfile.update({email: newEmail});
						 });
					 })
					.catch(error => {
						console.error(error);
					});
			}

			updatePassword (newPassword:string , oldPassword: string): Promise<any> {
				 const credential: AuthCredential = firebase.auth
					 .EmailAuthProvider.credential(
						 this.currentUser.email,
							oldPassword
						 );
					return this.currentUser
						.reauthenticateWithCredential(credential)
						 .then(user => {
							this.currentUser.updatePassword(newPassword).then(user => {
								console.log('Password Changed');
							});
					 })
					 .catch(error => {
						console.error(error);
					});
				}




}  



















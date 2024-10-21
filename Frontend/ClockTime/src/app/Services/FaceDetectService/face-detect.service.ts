import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../TokenService/token.service';


@Injectable({
  providedIn: 'root'
})


export class FaceDetectService{

  private apiUrl = 'https://localhost:4001/api/appointment';
  private apiFaceDetect = 'http://192.168.100.184:5000';

  constructor(private http: HttpClient, private tokenService : TokenService) { }

  detectFaces(file: File): Observable<any> {
    const formData = new FormData();
    const user = this.tokenService.getUserFromToken();
    console.log("USERRRRRRRRRRR: ", user);

    if (!user || !user.id) {
        console.error("Usuário não está autenticado ou o ID do usuário não está disponível.");
        return throwError(() => new Error("Usuário não autenticado."));
    }

    formData.append('file', file, file.name);
    formData.append('user_id', user.id.toString());

    return this.http.post(`${this.apiFaceDetect}/compare`, formData);
  }



  save_phototwo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`https://localhost:4001/api/account/upload-photos`, formData);
  }

  save_photos(files: File[]): Observable<any> {
    const formData = new FormData();
  
    files.forEach(file => {
      formData.append('files', file, file.name); // Usando 'files' como a chave
    });
    console.log("SERVICE: ", files)
    console.log(this.tokenService.getUserFromToken())
    const user = this.tokenService.getUserFromToken();

    if (user) {
      console.log("User ID:", user.id);
      console.log("User Name:", user.name);
      console.log("User Role:", user.role);
      formData.append('id', user.id); // Adiciona o ID ao formData
      console.log("FORM_DATA:::: ", formData)
    } else {
      console.log("No valid token found.");
    }
    // Passar Id do Usuário na URL
    return this.http.post(`https://localhost:4001/api/account/upload-photos/${user?.id}`, formData);
  }


  // save_photo(file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file, file.name); // Usando 'file' como a chave
  //   console.log("SERVICE: ", file);
  //   return this.http.post(`https://localhost:4001/api/account/upload-photos/`, formData);
  // }
  
  
  

  testing(): Observable<any> {
    const user = this.tokenService.getDecodedAccessToken();
    console.log("User", user);
    return this.http.get(`${this.apiUrl}/testing`);
  }
}

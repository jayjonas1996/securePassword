//
//  dataHandler.swift
//  securePassword
//
//  Created by Jay Naik on 06/07/18.
//  Copyright © 2018 Jay Naik. All rights reserved.
//

import Foundation
import CryptoSwift

func handleData(data: [Substring]) -> Void
{
    
    
    
    //let message = Data("It's coming home!".utf8)
    let site = String(data[0])      //site url
    let key = String(data[1])       //base64 encodes key 256 bits
    let iv = String(data[2])        //base64 encoded iv 128 bits
    let id = String(data[3])        //socket id
    
    let passwords:[String:String] = ["twitter.com":"passwordHere", "egov.ddit.ac.in":"passwordHere"]
    let usernames:[String:String] = ["twitter.com":"usernameHere","egov.ddit.ac.in":"usernameHere"]
    print(key.count)
    print(iv.count)

   
    
    let aes = AES(key: key, iv: iv)
        aes.encrypt(string: passwords[site]!)
    let base64 = aes.base64Cipher()
    let postData = ["username":usernames[site]!,"base64Cipher":base64,"id":id]
        sendCipher(params: postData)
return
}


func sendCipher(params: [String:String])
{
    guard let url = URL(string: "http://192.168.0.125:3000/sendcipher") else { return }
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.addValue("application/json", forHTTPHeaderField: "Content-Type")
    let httpBody =  try! JSONSerialization.data(withJSONObject: params, options: []) //else { return }
    request.httpBody = httpBody
    print("\n\njson",request.httpBody!.base64EncodedString())
    let session = URLSession.shared
    session.dataTask(with: request) { (data, response, error) in
        if let response = response {
            print(response)
        }
        
        if let data = data {
            do {
                let json = try JSONSerialization.jsonObject(with: data, options: [])
                print(json)
            } catch {
                print(error)
            }
        }
        
        }.resume()
    return
    
}


//
//  ViewController.swift
//  securePassword
//
//  Created by Jay Naik on 02/07/18.
//  Copyright © 2018 Jay Naik. All rights reserved.
//

import UIKit


class ViewController: UIViewController {
    
    var str64 = String()
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        
        
        //let aes = AES(key:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",iv:"abcdefghijklmnopqrstug==")
        //aes.test()
        
       
        
        
        
        
        
        
        // Do any additional setup after loading the view, typically from a nib.
    }

    
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    
    
    @IBAction func button(_ sender: Any) {
        let parameters = ["str64":str64] as [String : String]
        sendRequest(params: parameters)
    }
    
    
    
    
    
    func sendRequest(params: [String:String])
    {
     //   let parameters = ["enc": "@kilo_loco", "tweet": "HelloWorld"]
        
        guard let url = URL(string: "http://192.168.1.106:3000/getcipher") else { return }
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
    }

}


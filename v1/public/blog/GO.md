
## Why Does Your Go Server Log /favicon.ico Requests? (And How to Fix It)

### The Unexpected behaviour - 

If you run the below code 
```go
func main() {  
    http.HandleFunc("/", getRoot)  
    err := http.ListenAndServe(":8080", nil)  
    if err != nil {  
       panic(err)  
    }  
}

  
func getRoot(w http.ResponseWriter, r *http.Request) {  
    stringS, err := io.WriteString(w, "Hello, World!")  
    log.Println(r.RequestURI)  
    if err != nil {  
       return  
    }  
    log.Println("Wrote String to ResponseWriter:", stringS)  
}
```

and then check the logs then you would observe 
```shell
2025/07/05 22:53:58 /
2025/07/05 22:53:58 Wrote String to ResponseWriter: 13
2025/07/05 22:53:59 /favicon.ico
2025/07/05 22:53:59 Wrote String to ResponseWriter: 13
```

For each request you do "/" path or any GET request you do to other endpoints like "/hello" or "/form" you see the logs 
- the requested endpoint is called 
- sometimes "/favicon.ico" is called

### Why this happens?
Modern browsers now loads a favicon i.e., a small icon to the left of the tab name which is requested in random?(not really- depends upon the cache of the browser) to the backend go server 

### How do i clean my logs / How do i reduce the logs
Simple answer is to configure an endpoint "/favicon.ico" to return an icon 
``` go
func main() {  
    http.HandleFunc("/", getRoot)  
    http.HandleFunc("/favicon.ico", returnFavicon)  
    err := http.ListenAndServe(":8080", nil)  
    if err != nil {  
       panic(err)  
    }  
}  
  
func getRoot(w http.ResponseWriter, r *http.Request) {  
    stringS, err := io.WriteString(w, "Hello, World!")  
    log.Println(r.RequestURI)  
    if err != nil {  
       return  
    }  
    log.Println("Wrote String to ResponseWriter:", stringS)  
}  
  
func returnFavicon(w http.ResponseWriter, r *http.Request) {  
    log.Println("Favicon requested")  
    http.ServeFile(w, r, "favicon.ico")  
}
```

Else you can just ignore the logging of the /favicon.ico requests through middleware

``` go
func main() {  
    http.Handle("/", middleware(http.HandlerFunc(getRoot)))  
    err := http.ListenAndServe(":8080", nil)  
    if err != nil {  
       panic(err)  
    }  
}  
  
func getRoot(w http.ResponseWriter, r *http.Request) {  
    stringS, err := io.WriteString(w, "Hello, World!")  
    log.Println(r.RequestURI)  
    if err != nil {  
       return  
    }  
    log.Println("Wrote String to ResponseWriter:", stringS)  
}  
  
func middleware(handler http.Handler) http.Handler {  
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {  
       if r.URL.Path == "/favicon.ico" {  
          return  
       }  
       handler.ServeHTTP(w, r)  
    })  
}
```


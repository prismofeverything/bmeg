package main

import (
	"os"
	"log"
	"fmt"
	"flag"
	"path"
	"io/ioutil"
	"net/http"
	"net/http/httputil"
	//"net/url"
)

func NewReverseProxy(dst string) *httputil.ReverseProxy {
	return &httputil.ReverseProxy{
		Director: func(req *http.Request) {
			req.URL.Scheme = "http"
			req.URL.Host = dst
			req.Host = dst
			log.Printf("REQ: %s", req.URL)
		},
	}
}

func NotFound(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "the orb rotates, but not for you")
}

func FileServerWithIndex(fs http.FileSystem) http.Handler {
	fsh := http.FileServer(fs)
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, err := fs.Open(path.Clean(r.URL.Path))
		if os.IsNotExist(err) {
			log.Printf(r.URL.Path)
			bytes, _ := ioutil.ReadFile("public/index.html")
			index := string(bytes)
			fmt.Fprintf(w, index)
			// NotFound(w, r)
			return
		}
		fsh.ServeHTTP(w, r)
	})
}

func main() {
	port := flag.Uint("-p", 8000, "Proxy Port")
	flag.Parse()

	log.Printf("%s", flag.Arg(0))

	proxy := NewReverseProxy(flag.Arg(0))

	mux := http.NewServeMux()

	fs := FileServerWithIndex(http.Dir("./public"))
	mux.Handle("/vertex/", proxy)
	mux.Handle("/schema/protograph", proxy)
	mux.Handle("/vertex/find", proxy)
	mux.Handle("/edge/find", proxy)
	mux.Handle("/search/counts", proxy)
	mux.Handle("/", fs)
	http.ListenAndServe(fmt.Sprintf(":%d", *port), mux)
}

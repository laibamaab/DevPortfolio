### Building and running your application

When you're ready, start your application by running:
`docker compose up --build`.

Your application will be available at http://localhost:7999.

### Deploying your application to the cloud

First, build your image, e.g.: `docker build -t myapp .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`docker build --platform=linux/amd64 -t myapp .`.

Then, push it to your registry, e.g. `docker push myregistry.com/myapp`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)

### Deploy it on server
pull it on server. `docker pull anum0349/dev_portfolio:v1`.
run this cmd to make it live `docker run -d -p 7997:7997 --name portfolio-app   -e DB_URI=mongodb://mongodb:27017/portfolio   --link mongodb:mongodb   anum0349/dev_portfolio:v1`.
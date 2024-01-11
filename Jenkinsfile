pipeline {
    agent any

    environment{
        DOCKER_HOST = 'tcp://host.docker.internal:2375'
        def dockerTool = tool name: 'docker-latest-tool', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool' 
        PATH = "${dockerTool}/bin:${env.PATH}"    
    }

    stages {
        stage('Load ENV'){
            steps{
                withCredentials([file(credentialsId: 'indietour-api-env', variable: 'ENV')]){
                    sh "rm -f .env"
                    sh "cp $ENV .env"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                    docker build -t dstoffels/indietour-frontend:$BUILD_NUMBER .
                    """
                }
            }
        }

        stage("Push Docker Image"){
            steps{
                withCredentials([usernamePassword(credentialsId: 'personal-docker-hub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh """
                    docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}
                    docker push dstoffels/indietour-frontend:$BUILD_NUMBER
                    docker tag dstoffels/indietour-frontend:$BUILD_NUMBER dstoffels/indietour-frontend:latest
                    docker push dstoffels/indietour-frontend:latest
                    """
                }
            }
        }

        stage('Deploy to GCP') {
            steps{
                withCredentials([sshUserPrivateKey(credentialsId: 'frontend-ssh-key', keyFileVariable: 'SSH_KEY'), file(credentialsId: 'indietour-api-env', variable: 'ENV')]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY dan.stoffels@104.155.142.30 <<'EOF'
                        if [ -f .env ]; then
                            sudo rm .env
                        fi
                    '''
                    
                    sh '''scp -i $SSH_KEY $ENV dan.stoffels@104.155.142.30:./.env'''

                    sh '''
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY dan.stoffels@104.155.142.30 <<'EOF'

                        if [ -f docker-compose.yaml ]; then
                            sudo docker-compose down
                        fi

                        sudo docker image prune -af

                        sudo curl -o docker-compose.yaml https://raw.githubusercontent.com/dstoffels/indietour-client/main/docker-compose.yaml

                        sudo docker-compose up -d                   
                        ''' 
                }
            }
        }

        stage('Generate SSH') {
            steps{
                withCredentials([sshUserPrivateKey(credentialsId: 'frontend-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY dan.stoffels@104.155.142.30 <<'EOF'
                        
                        sudo apt-get update
                        sudo apt-get install certbot

                        sudo curl -o nginx https://raw.githubusercontent.com/dstoffels/indietour-client/dev/nginx
                        
                        sudo certbot certonly --webroot -w ./certbot/www -d indietour.org --non-interactive --agree-tos --email indietour.app@gmail.com

                        docker-compose restart nginx
                    '''
                }
            }
        }

        stage("Clean Up"){
            steps{
                sh "docker image prune -f"
            }
        }
    }
}

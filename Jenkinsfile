pipeline {
    agent any

    environment {
        DOCKER_HOST = 'tcp://host.docker.internal:2375'
        def dockerTool = tool name: 'docker-latest-tool', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool' 
        PATH = "${dockerTool}/bin:${env.PATH}"
        
        VM_IP = "34.31.255.80"
        VM_USERNAME = "dan_stoffels"
        IMAGE_NAME = "dstoffels/indietour-frontend"    
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

        // stage('Build Docker Image') {
        //     steps {
        //         script {
        //             sh """
        //             docker build -t ${env.IMAGE_NAME}:$BUILD_NUMBER .
        //             """
        //         }
        //     }
        // }

        // stage("Push Docker Image"){
        //     steps{
        //         withCredentials([usernamePassword(credentialsId: 'personal-docker-hub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
        //             sh """
        //             docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}
        //             docker push ${env.IMAGE_NAME}:$BUILD_NUMBER
        //             docker tag ${env.IMAGE_NAME}:$BUILD_NUMBER ${env.IMAGE_NAME}:latest
        //             docker push ${env.IMAGE_NAME}:latest
        //             """
        //         }
        //     }
        // }

        stage('Init VM') {
            steps{
                withCredentials([sshUserPrivateKey(credentialsId: 'indietour-frontend-ssh', keyFileVariable: 'SSH_KEY'), file(credentialsId: 'indietour-api-env', variable: 'ENV')]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY ${env.VM_USERNAME}@${env.VM_IP} <<'EOF'
                            sudo apt-get update
                            sudo apt-get install docker docker-compose -y
                            sudo mkdir -p /etc/letsencrypt
                            sudo mkdir -p /var/www/certbot
                            sudo mkdir -p /etc/nginx
                    """ 

                    sh """
                        scp -i $SSH_KEY docker-compose.yaml ${env.VM_USERNAME}@${env.VM_IP}:./docker-compose.yaml
                        scp -i $SSH_KEY ./nginx/nginx.init.conf ${env.VM_USERNAME}@${env.VM_IP}:./nginx.init.conf
                        scp -i $SSH_KEY ./nginx/nginx.conf ${env.VM_USERNAME}@${env.VM_IP}:./default.conf
                    """
                }
            }
        }

        stage('Deploy to VM') {
            steps{
                withCredentials([sshUserPrivateKey(credentialsId: 'indietour-frontend-ssh', keyFileVariable: 'SSH_KEY'), file(credentialsId: 'indietour-frontend-env', variable: 'ENV')]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY ${env.VM_USERNAME}@${env.VM_IP} <<'EOF'
                        if [ -f .env ]; then
                            sudo rm .env
                        fi
                    """
                    
                    sh "scp -i $SSH_KEY $ENV ${env.VM_USERNAME}@${env.VM_IP}:./.env"

                    sh """
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY ${env.VM_USERNAME}@${env.VM_IP} <<'EOF'

                        if [ -f docker-compose.yaml ]; then
                            sudo docker-compose down
                        fi

                        sudo docker image prune -af

                        sudo docker-compose up -d                   
                    """ 
                }
            }
        }

        stage('Generate SSL') {
            steps{
                withCredentials([sshUserPrivateKey(credentialsId: 'indietour-frontend-ssh', keyFileVariable: 'SSH_KEY')]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY ${env.VM_USERNAME}@${env.VM_IP} <<'EOF'

                        
                        if [ ! -f /etc/letsencrypt/live/indietour.org/fullchain.pem ]; then
                            cp ./default.conf ./nginx.conf
                            cp ./nginx.init.conf ./default.conf
                            docker-compose exec nginx nginx -s reload
                            
                            echo "generating new SSL cert..."
                            docker-compose run --rm certbot certonly --webroot --staging --webroot-path=/var/www/certbot --email indietour.app@gmail.com -n --agree-tos -d indietour.org -d www.indietour.org
                            docker-compose exec nginx nginx -s reload
                        fi
                        echo "Setting up cron job for certificate renewal..."
                        (crontab -l 2>/dev/null; echo "0 0,12 * * * docker-compose run --rm certbot renew --webroot --webroot-path=/var/www/certbot && docker-compose exec nginx nginx -s reload") | crontab -
                    """
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

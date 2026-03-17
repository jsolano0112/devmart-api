pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                echo 'Starting installing dependencies...'

                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

     
    }
}

def compose = "docker-compose -f ./docker-compose.yml -f ./docker-compose.test.yml -f ./docker-compose.robot.yml"
def environment = "myNodeProject"

pipeline {
  agent {
    label 'docker'
  }

  options {
    timeout(time: 20, unit: 'MINUTES')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
      steps {
        sh "${compose} -p ${environment} build --pull"
      }
    }

    stage('Unit Test') {
      steps {
        sh "${compose} -p ${environment} run test"

      }
    }

    stage('Acceptance Test') {
      steps {
        sh "${compose} -p ${environment} run robot"

        step([$class: 'ArtifactArchiver', artifacts: 'results/robot/log.html, results/robot/selenium-*.png'])

        step([$class: 'RobotPublisher',
            disableArchiveOutput: false,
            logFileName: 'results/robot/log.html',
            onlyCritical: true,
            otherFiles: '',
            outputFileName: 'results/robot/output.xml',
            outputPath: '.',
            passThreshold: 90,
            reportFileName: 'results/robot/report.html',
            unstableThreshold: 100])
      }
    }
  }

  post {
    always {
      step([$class: 'JUnitResultArchiver', testResults: 'results/mocha/test-results.xml'])
      sh "${compose} -p ${environment} down -v"
    }
  }
}

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
        runCompose("-f docker-compose.yml -f compose/test.yml -f compose/robot.yml", "build --pull")
      }
    }

    stage('Unit Test') {
      steps {
        runCompose("-f compose/test.yml", "run mocha")
      }
      post {
        always {
          step([$class: 'JUnitResultArchiver', testResults: 'results/mocha/test-results.xml'])
        }
      }
    }

    stage('Lint') {
      steps {
        runCompose("-f compose/test.yml", "run lint-backend")
        runCompose("-f compose/test.yml", "run lint-frontend")
      }
    }

    stage('Audit') {
      steps {
        runCompose("-f compose/test.yml", "run audit-backend")
        runCompose("-f compose/test.yml", "run audit-frontend")
      }
    }

    stage('Acceptance Test') {
      steps {
        runCompose("-f compose/robot.yml", "run robot")
      }
      post {
        always {
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
              unstableThreshold: 100]);
        }
      }
    }
  }

  post {
    always {
      runCompose("-f docker-compose.yml -f compose/test.yml -f compose/robot.yml", "down -v")
    }
  }
}

def runCompose(composeFiles = "", operation = "build") {
  sh "docker-compose -p example --project-directory . ${composeFiles} ${operation}"
}

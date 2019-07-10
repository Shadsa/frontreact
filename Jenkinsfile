#!/usr/bin/env groovy
import groovy.json.JsonOutput
import java.text.SimpleDateFormat

stack_name = "mmw"
service_name = "webview"
registry_url = "https://nexus.innovation-factory.io"
api_url="https://mmw-pprod.innovation-factory.io/api"

pipeline {
	agent any

	environment {
        releaseVersion = ""
        COMPOSE_FILE = "docker-compose.robots.yml"
    }

    options {
        gitLabConnection("JenkinsGitLab")
        disableConcurrentBuilds()
        lock("MapMyWorld webview Jenkins Build")
    }

    stages {
    	stage("Checkout") {
    		steps {
    			checkout scm
	    		script {
                    // if tag, set the version at the last tag
                    if ("${env.TAG_NAME}" != "null") {
                        releaseVersion = sh(returnStdout: true, script: 'git describe --tags `git rev-list --tags --max-count=1`').trim()
                    } else {
                        switch(env.GIT_BRANCH) {
                            // if commit on develop
                            case "develop": releaseVersion = "latest-dev"; break;
                            // else, just latest
                            default: releaseVersion = "latest";
                        }
                    }
                    echo "Current version : ${releaseVersion}"
	    		}
    		}
    	}

        stage("Tests") {
            steps {
                script {
                    sh("docker run --rm -v ${env.WORKSPACE}:/app --workdir=/app node:alpine npm install")
                    sh("docker run --rm -v ${env.WORKSPACE}:/app --workdir=/app -e CI=true node:alpine npm test")
                }
            }
        }

        stage("Quality") {
            steps {
                script {
                    sh("docker-compose -f docker-compose.jenkins.yml build")
                    sh("docker-compose -f docker-compose.jenkins.yml up")
                }

                publishHTML (
                            target: [
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: "target/documentation/html",
                                reportFiles: "index.html",
                                reportName: "DOxygen"
                            ])
                checkstyle canComputeNew: false, defaultEncoding: '', healthy: '', pattern: 'target/eslint.xml', unHealthy: ''
                cobertura autoUpdateHealth: false, autoUpdateStability: false, coberturaReportFile: 'target/cobertura-coverage.xml', conditionalCoverageTargets: '70, 0, 0', failUnhealthy: false, failUnstable: false, lineCoverageTargets: '80, 0, 0', maxNumberOfBuilds: 0, methodCoverageTargets: '80, 0, 0', onlyStable: false, sourceEncoding: 'ASCII', zoomCoverageChart: false
            }
        }

        stage("SonarQube analysis") {
            environment {
                scannerHome = tool "SonarQubeScanner"
            }
            steps {
                withSonarQubeEnv("SonarQube") {
                    sh("${scannerHome}/bin/sonar-scanner -Dsonar.projectVersion=${releaseVersion}")
                }
                // timeout(time: 2, unit: "MINUTES") {
                //     waitForQualityGate abortPipeline: false
                // }
            }
        }

        stage("Robot Framework") {
            steps {
                script {
                    sh("docker-compose build")
                    sh("docker-compose up -d mmw-webview")
                    sh("docker-compose up mmw-robot-framework")
                    sh("docker-compose down")
                }
                // step([
                //     $class : "RobotPublisher",
                //     outputPath : "scripts_auto/log",
                //     outputFileName : "*.xml",
                //     disableArchiveOutput : false,
                //     passThreshold : 100,
                //     unstableThreshold: 95.0,
                //     otherFiles : "*.png",
                // ])
            }
        }


        stage("Docker build") {
            steps {
                script {
                    sh("echo REACT_APP_API_HOST=${api_url} > .env")
                    dockerImage = docker.build("${stack_name}/${service_name}:${releaseVersion}")
                }
            }
        }

        stage("Publish to registry") {
            when {
                expression {
                    return "${env.TAG_NAME}" != "null" || env.GIT_BRANCH == "develop";
                }
            }
        	steps {
                script {
                    docker.withRegistry("${registry_url}", "NexusJenkins") {
                        dockerImage.push "${releaseVersion}"
                    }
                }
        	}
        }
    }
}

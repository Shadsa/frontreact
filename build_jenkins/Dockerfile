FROM node:10.15.3
RUN apt-get update -qq && apt-get install -qqy doxygen graphviz &&  apt-get clean

RUN mkdir /var/jenkins_home
RUN mkdir /var/jenkins_home/workspace
RUN mkdir /var/jenkins_home/workspace/mmw-webview
WORKDIR /var/jenkins_home/workspace/mmw-webview
# Copy run script
ADD run.sh /run.sh
RUN chmod +x /run.sh

# Launch npm start
ENTRYPOINT ["/run.sh"]
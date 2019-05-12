import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import pedometer from './assets/pedometer.png'
import steps from './assets/steps.png'
import Pedometer from 'react-native-universal-pedometer'
import DialogInput from 'react-native-dialog-input';


export default class App extends Component {

  constructor() {
    super()

    this.state = {
      stepCount: 0,
      //default set goal is 200
      defaultGoal: 200,
      isDialogVisible: false
    }
  }

  //popup the dialog to set the goal
  startCount() {
    this.setState({
      isDialogVisible: true
    })
  }

  steps() {
    //get current time
    const now = new Date();
    //start the steps counter
    Pedometer.startPedometerUpdatesFromDate(now.getTime(), pedometerData => {
      // do something with pedometer data

      console.log(pedometerData, 'pedometerData')
      //set the numbers of steps taken and show to the user
      this.setState({ stepCount: pedometerData.numberOfSteps })
    });
  }

  //stop the step counter
  //and reset the steps to zero
  stopCount() {

    Pedometer.stopPedometerUpdates()
    this.setState({ stepCount: 0 })
  }

  // get the input value from user
  // set value to the goal state
  sendInput(input) {
    this.setState({
      goal: input,
      isDialogVisible: false
    })

    //starts the pedometer
    this.steps()
  }

  render() {
    const { stepCount, goal, defaultGoal, isDialogVisible } = this.state
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
          <View style={styles.container}>
            {/* header */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
              <View style={{ width: 60, height: 60 }}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={pedometer}
                />
              </View>
              <View style={{ alignSelf: 'center' }}>
                <Text style={{ fontSize: 20, color: 'antiquewhite' }}>{'Pedometer'}</Text>
              </View>
            </View>

            {/* steps count */}
            <View style={styles.stepsCount}>
              <View style={styles.mySteps}>
                <View style={{
                  borderColor: 'gray',
                  width: '70%',
                  borderWidth: 2,
                  height: '52%',
                  alignItems: 'center',
                  borderRadius: 1000,
                  opacity: 0.6,
                  backgroundColor: 'gray'
                }}>
                  <View style={{
                    paddingTop: '10%',
                  }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                      {'Goal:'}
                    </Text>
                    <Text style={{ textAlign: 'center' }}>
                      {goal ? goal : defaultGoal}
                    </Text>
                  </View>
                  <View style={{
                    flex: 1,
                    width: '100%',
                    alignItems: 'center',
                    // borderWidth: 3,
                    paddingTop: '4%'
                  }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 70, color: 'antiquewhite' }}>
                      {stepCount ? stepCount : 0}
                    </Text>
                  </View>
                  <View style={{ width: 60, height: 60 }}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      source={steps}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* footer */}
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => this.startCount()} style={{
                flexGrow: 1,
                paddingVertical: 20,
                borderWidth: 1,
                backgroundColor: 'gray',
                borderColor: 'gray'
              }}>
                <View>
                  <Text style={{ textAlign: 'center', color: 'antiquewhite' }}>
                    {'Start'}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.stopCount()} style={{
                flexGrow: 1,
                paddingVertical: 20,
                borderLeftWidth: 1,
                borderRightColor: 'gray',
                borderTopColor: 'gray',
                borderLeftColor: 'antiquewhite',
                backgroundColor: 'gray',
              }}>
                <View>
                  <Text style={{ textAlign: 'center', color: 'antiquewhite' }}>
                    {'Stop'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        {
          isDialogVisible ?
            <DialogInput isDialogVisible={isDialogVisible}
              title={"Goal!"}
              message={"Set your goal here"}
              hintInput={"eg: 200"}
              submitText={'START'}
              submitInput={(inputText) => { this.sendInput(inputText) }}
              closeDialog={() => { this.setState({ isDialogVisible: false }) }}>
            </DialogInput>
            :
            null

        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1
  },
  linearGradient: {
    flex: 1
  },
  stepsCount: {
    // borderWidth: 3,
    flexGrow: 1,
  },
  footer: {
    flexDirection: 'row'
  },
  mySteps: {
    flex: 1,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

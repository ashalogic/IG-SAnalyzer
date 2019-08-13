import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from '@material-ui/icons/Menu';
import { createMuiTheme } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";
import yellow from "@material-ui/core/colors/yellow";
import { ThemeProvider } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import IGAppbar from "./igappbar";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };

  }

  // componentDidMount() {
  //   return fetch("https://www.instagram.com/lanadelrey/?__a=1")
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       console.log(responseJson);
  //       this.setState(
  //         {
  //           isLoading: false,
  //           dataSource: responseJson
  //         },
  //         function() {}
  //       );
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  addbb() {
    //    // hide our user interface that shows our A2HS button
    // // btnAdd.style.display = 'none';
    // // Show the prompt
    // deferredPrompt.prompt();
    // // Wait for the user to respond to the prompt
    // deferredPrompt.userChoice
    //   .then((choiceResult) => {
    //     if (choiceResult.outcome === 'accepted') {
    //       console.log('User accepted the A2HS prompt');
    //     } else {
    //       console.log('User dismissed the A2HS prompt');
    //     }
    //     deferredPrompt = null;
    //   });
  }
  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <div className="container">
    //       <div className="row bg-dark">
    //         <div className="col text-center">
    //           <br />
    //           <br />
    //         </div>
    //       </div>
    //       <div className="row">
    //         <div className="col text-center">
    //           <br />
    //           <img alt="loading" src="../images/loading.svg" />
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }

    const theme = createMuiTheme({
      palette: {
        primary: pink,
        secondary: yellow
      },
      status: {
        danger: "orange"
      }
    });

    return (
      <div>
        <ThemeProvider theme={theme}>
          <IGAppbar />

        </ThemeProvider>
      </div>
    );
  }
}

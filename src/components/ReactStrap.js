import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import cadetlogo from "images/cadetlogo.png";
import cadettitle from "images/cadettitl.png";
import CadetHeader from "./cadetheader";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import Toggle from "material-ui/Toggle";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import Avatar from "material-ui/Avatar";
import FileFolder from "material-ui/svg-icons/file/folder";
import FontIcon from "material-ui/FontIcon";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import { Tabs, Tab } from "material-ui/Tabs";

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500
} from "material-ui/styles/colors";
import Paper from "material-ui/Paper";

import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Collapse,
  CardBody,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  DropdownToggle,
  CardImg,
  CardSubtitle,
  CardHeader
} from "reactstrap";
import HomeComponent from "./HomeMainComponent";
import ApprovalsTab from "./Approvals";
import BudgetStaff from "./BudgetStaff";
import Reports from "./Reports";
import Course from "./Course";
import Admin from "./Admin";

import CadetsSearch from "./CadetsSearch";
import AttribList from "./AttribTables";

import "App.css";

const tabStyles = {
  backgroundColor: "#1b3039"
};

const paperStyle = {
  height: "80px",
  width: "99.2%",
  margin: 5,
  // textAlign: "left",
  // display: "flex",
  // justifyContent: "left"
};
const FirstFunctional = props => {
  return <div onClick={() => props.showMessage("Child")}>{props.name}</div>;
};

export class ReactStrapComp extends Component {
  static propTypes = {
    //name: PropTypes.string.isRequired
  };

  showMessage(msg) {
    alert(msg);
  }
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      collapse: false,
      status: "Closed",
      cadetName: "",
      activeTab: "0"
    };

    this.cadetSearch = this.cadetSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  handleActive(tab) {
    alert(
      `A tab with this route property ${tab.props["data-route"]} was activated.`
    );
  }

  cadetSearch(cadet) {
    //alert(cadet.hv_cadet_name);
    this.setState({
      cadetName: cadet.hv_cadet_name
    });
    this.setState({
      activeTab: "1"
    });
  }

  handleChange = value => {
    // alert(value)
    this.setState({
      activeTab: value
    });
  };

  render() {
    return (
      <div className="mh-100 mw-100">
        <Card>

          <Paper style={paperStyle} zDepth={1} >
            <CadetHeader></CadetHeader>
          </Paper>

          <Tabs value={this.state.activeTab} onChange={this.handleChange}>
            <Tab
              style={tabStyles}
              label="Home"
              value="0"
              icon={<FontIcon className="fa fa-home" />}
            >
              <div>
                <p>
                  <HomeComponent callParentSearch={this.cadetSearch} />
                </p>
              </div>
            </Tab>
            <Tab
              style={tabStyles}
              label="Cadets"
              value="1"
              icon={<FontIcon className="fa fa-home" />}
            >
              <div>
                <CadetsSearch cadetName={this.state.cadetName} />
              </div>
            </Tab>
            <Tab
              style={tabStyles}
              label="Staff and Budget"
              value="2"
              icon={<FontIcon className="fa fa-users" />}
            >
              <div>
                <p>
                  <BudgetStaff />
                </p>
              </div>
            </Tab>
            <Tab
              style={tabStyles}
              label="Course Schedule"
              value="3"
              icon={<FontIcon className="fa fa-calendar" />}
            >
              <div>
                <p>
                  <Course />
                </p>
              </div>
            </Tab>
            <Tab
              style={tabStyles}
              label="Approvals"
              value="4"
              icon={<FontIcon className="fa fa-check-circle" />}
            >
              <div>
                <p>
                  <ApprovalsTab />
                </p>
              </div>
            </Tab>{" "}
            <Tab
              style={tabStyles}
              label="Reports"
              value="5"
              icon={<FontIcon className="fa fa-line-chart" />}
            >
              <div>
                <p>
                  <Reports />
                </p>
              </div>
            </Tab>{" "}
            <Tab
              style={tabStyles}
              label="Admin"
              value="6"
              icon={<FontIcon className="fa fa-cog" />}
            >
              <Row className="m-0 p-0">
                <Col sm="12">
                  <Container
                    fluid
                    style={{
                      overflow: "hidden",
                      margin: "2px"
                    }}
                  >
                    {/* <Row className="m-0 p-0">                            
                    <Col sm="12">
                      <h4 className="text-default">
                        Admin{" "}
                        <i className="fa fa-arrow-circle-o-down" />{" "}
                      </h4>
                    </Col>
                  </Row> */}
                    <Row className="m-0 p-0">
                      {" "}
                      <Col sm="12">
                        <Admin />
                        {/*<AttribList {...this.props} />*/}
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReactStrapComp);

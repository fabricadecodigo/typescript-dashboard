import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import PersonIcon from '@material-ui/icons/Person';
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import CheckIcon from '@material-ui/icons/Check';

// material ui components
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';


// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Tasks from "../../components/Tasks/Tasks";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import Button from '../../components/CustomButtons/Button';
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";

import { bugs, website, server } from "../../variables/general";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "../../variables/charts";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import CustomInput from "../../components/CustomInput/CustomInput";
import Success from "../../components/Typography/Success";

import { getTotalInBrazil } from '../../repositories/covid-api';
import { IChartCasesByState, getChartCasesByState } from "../../use-cases/chart-get-cases-by-state";
import { IChartDeathsByState, getChartDeathsByState } from "../../use-cases/chart-get-deaths-by-state";
import { ITableInfoByState, getChartInfoByState } from '../../use-cases/chart-info-by-state'

interface Props {
  classes: any;
}

interface State {
  value: number;
  creatingMessage: boolean;
  messageSuccess: boolean;
  messageFailed: boolean;
  totalCases: number;
  totalDeaths: number;
  totalSuspects: number;
  totalRefuses: number;
  updateAt?: Date;
  chartCasesByState?: IChartCasesByState;
  chartDeathsByState?: IChartDeathsByState;
  tableInfoByState?: ITableInfoByState;
  filteredTableInfoByState?: ITableInfoByState;
  states: string[];
  selectedState: string;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
      creatingMessage: false,
      messageSuccess: true,
      messageFailed: true,
      totalCases: 0,
      totalDeaths: 0,
      totalSuspects: 0,
      totalRefuses: 0,
      states: ["SP", "BA", "MG", "RJ", "CE", "PA", "SC", "GO", "RS", "DF", "PR", "MA", "PE", "AM", "ES", "MT", "PB", "PI", "AL", "SE", "MS", "RN", "TO", "RO", "RR", "AP", "AC"].sort(),
      selectedState: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }
  handleChange = (event: any, value: number) => {
    this.setState({ value });
  };

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  };

  handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>, child: React.ReactNode) => {
    let infoByStateFiltered: string[][] = [];
    if (this.state.tableInfoByState) {
      infoByStateFiltered = this.state.tableInfoByState.data;
      if (event.target.value) {
        infoByStateFiltered = this.state.tableInfoByState.data.filter(item => item[0] === event.target.value);
      }
    }
    this.setState({
      selectedState: event.target.value,
      filteredTableInfoByState: { data: infoByStateFiltered }
    });
  }

  async componentDidMount() {
    const totalInBrazil = await getTotalInBrazil();

    const chartCasesByState = await getChartCasesByState();
    const chartDeathsByState = await getChartDeathsByState();
    const tableInfoByState = await getChartInfoByState();

    this.setState({
      totalCases: totalInBrazil.cases,
      totalDeaths: totalInBrazil.deaths,
      totalSuspects: totalInBrazil.confirmed,
      totalRefuses: totalInBrazil.recovered,
      updateAt: new Date(totalInBrazil.updated_at),
      chartCasesByState: chartCasesByState,
      chartDeathsByState: chartDeathsByState,
      tableInfoByState: tableInfoByState,
      filteredTableInfoByState: tableInfoByState
    });
  }

  render() {
    const { classes } = this.props;
    const { creatingMessage, messageFailed, messageSuccess } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            {/* Casos confirmados */}
            <Card>
              <CardHeader color="warning" stats={true} icon={true}>
                <CardIcon color="warning">
                  <PersonIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Casos ativos</p>
                <h3 className={classes.cardTitle}>
                  {this.state.totalCases.toLocaleString()}
                </h3>
              </CardHeader>
              <CardFooter stats={true}>
                <div className={classes.stats}>
                  <DateRange />
                  {this.state.updateAt?.toLocaleDateString()}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            {/* Mortes confirmadas */}
            <Card>
              <CardHeader color="danger" stats={true} icon={true}>
                <CardIcon color="danger">
                  <PersonIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Mortes confirmadas</p>
                <h3 className={classes.cardTitle}>
                  {this.state.totalDeaths.toLocaleString()}
                  {/* 49/50 <small>GB</small> */}
                </h3>
              </CardHeader>
              <CardFooter stats={true}>
                <div className={classes.stats}>
                  <DateRange />
                  {this.state.updateAt?.toLocaleDateString()}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            {/* Casos suspeitos */}
            <Card>
              <CardHeader color="info" stats={true} icon={true}>
                <CardIcon color="info">
                  <PersonIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Casos confirmados</p>
                <h3 className={classes.cardTitle}>
                  {this.state.totalSuspects.toLocaleString()}
                </h3>
              </CardHeader>
              <CardFooter stats={true}>
                <div className={classes.stats}>
                  <DateRange />
                  {this.state.updateAt?.toLocaleDateString()}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            {/* Casos recuperados */}
            <Card>
              <CardHeader color="success" stats={true} icon={true}>
                <CardIcon color="success">
                  <PersonIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Casos recuperados</p>
                <h3 className={classes.cardTitle}>
                  {this.state.totalRefuses.toLocaleString()}
                </h3>
              </CardHeader>
              <CardFooter stats={true}>
                <div className={classes.stats}>
                  <DateRange />
                  {this.state.updateAt?.toLocaleDateString()}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart={true}>

              <CardHeader color="info">
                {this.state.chartCasesByState &&
                  <ChartistGraph
                    className="ct-chart"
                    data={this.state.chartCasesByState.data}
                    options={this.state.chartCasesByState.options}
                    type="Bar"
                  />
                }
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Casos por estado</h4>
                {/* <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </p> */}
              </CardBody>
              {/* <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter> */}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart={true}>
              <CardHeader color="danger">
                {this.state.chartDeathsByState &&
                  <ChartistGraph
                    className="ct-chart"
                    data={this.state.chartDeathsByState.data}
                    options={this.state.chartDeathsByState.options}
                    type="Bar"
                  />
                }
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Mortes por estado</h4>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart={true}>
              <CardHeader color="info">

                <h3>Informações por estado</h3>
              </CardHeader>
              <CardBody>

                <FormControl className={classes.formControl} fullWidth={true}>
                  <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
                  <Select
                    // labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.selectedState}
                    onChange={this.handleStateChange}
                  // label="Age"
                  >
                    <MenuItem value="">
                      <em>- Escolha -</em>
                    </MenuItem>
                    {this.state.states.map((state) => (
                      <MenuItem key={state} value={state}>{state}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Table
                  tableHeaderColor="info"
                  tableHead={['Estado', "Confirmados", "Mortes"]}
                  tableData={this.state.filteredTableInfoByState?.data ?? []}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        {/* <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart={true}>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart={true}>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart={true}>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  ),
                },
                {
                  tabName: "Website",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  ),
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  ),
                },
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Salary", "Country"]}
                  tableData={[
                    ["1", "Dakota Rice", "$36,738", "Niger"],
                    ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                    ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                    ["4", "Philip Chaney", "$38,735", "Korea, South"],
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="success">
                <div className={classes.messages}>
                  <h4 className={classes.cardTitleWhite}>Mensagens Positivas</h4>
                  {!creatingMessage && (
                    <Button
                      color="transparent"
                      variant="outlined"
                      onClick={() => this.setState({ creatingMessage: true })}
                    >
                      Enviar Mensagem
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardBody>
                {!creatingMessage
                  ? <React.Fragment>
                    <h5 className={classes.cardTitle}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac est pulvinar, tempor turpis id,
                      vehicula magna.
                      </h5>
                    <p className={classes.cardCategory}>
                      Jane Doe
                      </p>
                  </React.Fragment>
                  : <React.Fragment>
                    <GridContainer>
                      <GridItem xs={12}>
                        <CustomInput
                          labelText="Nome"
                          id="name"
                          color="success"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12}>
                        <CustomInput
                          labelText="Mensagem"
                          id="message"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            multiline: true,
                            rows: 5
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </React.Fragment>
                }
              </CardBody>
              {creatingMessage && (
                <CardFooter>
                  <Button color="danger" onClick={() => this.setState({ creatingMessage: false })} >Cancelar</Button>
                  <Button color="success">Enviar Mensagem</Button>
                </CardFooter>
              )}
              {messageFailed && (
                <CardFooter>
                  <div className={classes.stats}>
                    <Danger>
                      <Warning />
                      Falha ao enviar mensagem
                    </Danger>
                  </div>
                </CardFooter>
              )}
              {messageSuccess && (
                <CardFooter>
                  <div className={classes.stats}>
                    <Success>
                      <CheckIcon />
                      Mensagem enviada com sucesso
                    </Success>
                  </div>
                </CardFooter>
              )}
            </Card>
          </GridItem>
        </GridContainer> */}
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);

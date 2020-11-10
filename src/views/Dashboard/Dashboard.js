import React,{ useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


// @material-ui/core
import { makeStyles , withStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import {LinearProgress, LinearProgressWithLabel} from "@material-ui/core"
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import {ProgressBar} from "react-bootstrap"
import { bugs, website, server } from "variables/general.js";
import  {getCountries} from "../../services/Api"
import Map from "../Maps/Maps"

import {Tab, Tabs, } from '@material-ui/core'
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { func } from "prop-types";
import bag from '../../assets/img/bag.png'
import planta from '../../assets/img/planta.png'
import rake from '../../assets/img/rake.png'
import molino from '../../assets/img/molino.png'
const useStyles = makeStyles(styles);
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: '#fff',
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [tabValue, setTabValue] = React.useState(0);

  const [fields, setFields] = useState([]);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };


  const typeGrav= ['Bar','Line']
  const ColorGrav= ['success','warning', 'danger', 'primary', 'info']
  const [mg, setMg] = useState([]);
  const [mn, setMn] = useState([]);
  const [na, setNa] = useState([]);
  const [s, setS] = useState([]);
  const [fe, setFe] = useState([]);
  const [k, setK] = useState([]);
  const [pb, setPb] = useState([]);
  const [zn, setZn] = useState([]);
  const [mo, setMo] = useState([]);
  const [ca, setCa] = useState([]);
  const [po, setPo] = useState([]);
  const [ce, setCe] = useState([]);
  const [cu, setCu] = useState([]);
  const [nitrogenos, setNitrogenos] = useState([]);
  const [b, setB] = useState([]);
  const [morg, setMorg] = useState([]);
  const [puntos, setPuntos] = useState([]);
  const [pan, setPan] =  useState([]);
  const valuesAr = [mg,
    mn,
    na,
    s,
    fe,
    k,
    pb,
    zn,
    mo,
    ca,
    po,
    ce,
    cu,
    nitrogenos,
    b,
    morg]

  const valuesSet = [
    setMg,
    setMn,
    setNa,
    setS,
    setFe,
    setK,
    setPb,
    setZn,
    setMo,
    setCa,
    setPo,
    setCe,
    setCu,
    setNitrogenos,
    setB,
    setMorg,
  ]
  const values = ['Mg (Magnesio) PPM',
  'Mn (Manganeso) PPM',
  'Na (Sodio) PPM',
  'S (Azufre) PPM',
  'Fe (Hierro) PPM',
  'K (Potasio) PPM',
  'P-Bray (Fósforo P-bray) PPM',
  'Zn (Zinc) PPM',
  'Mo (Molibdeno) PPM',
  'Ca (Calcio) PPM',
  'P-Olsen (Fósforo P1) PPM',
  'C.E. (Conductividad eléctrica)',
  'Cu (Cobre) PPM',
  'N-NO3 (Nitrogenos totales) PPM',
  'B (Boro) PPM',
  'M.O. (Materia organica) %']
  var Chartist = require("chartist");

  // ##############################
  // // // variables used to create animation on charts
  // #############################
  var delays = 80,
    durations = 500;
  var delays2 = 80,
    durations2 = 500;

  async function componentDidMount(){
    
    const response = await getCountries();
    
    setFields(response)

    var auxNit = []
    response.forEach(element => auxNit.push(element.fields['N-NO3 (Nitrogenos totales) PPM']));
    setNitrogenos(auxNit)
    
    var auxMO = []
    response.forEach(element => auxMO.push(element.fields['M.O. (Materia organica) %']));
    setMo(auxMO)
   
    

    var locations = []
    response.forEach(element => locations.push([element.fields['Latitude'],element.fields['Longitude']]));
    setPuntos(locations)
    values.forEach( (value, index) => {
      
      
      
      var ephimeralAud = []
      response.forEach(element => ephimeralAud.push(element.fields[value]));
      setData(valuesSet[index], ephimeralAud)
      // valuesSet[index](ephimeralAud)
      // 
      // 
    });

    
  }
  function setData(receptor,_data){
    
    receptor(_data)
  }
  useEffect(() => {
    componentDidMount();
  }, []);

  const MoChart = {
    data: {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      series: [mo]
    }
  }
  const nitrogenosChart = {
    data: {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      series: [nitrogenos]
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    // for animation
    animation: {
      draw: function(data) {
        if (data.type === "line" || data.type === "area") {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === "point") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      }
    }
  };

  function drawBar(a, datos){
    
    // if(a !== "Ubicación" && a !== "Notes" && a !== "Latitude" && a !== "Longitude")
    if(values.includes(a))
    {
      return( 
        <CardBody>
        
        <h4 className={classes.cardTitle}>{a}</h4>
        <BorderLinearProgress variant="determinate" value={datos[a]} />
        </CardBody>

      )
    }
    // Object.keys(a).forEach(function (item) {
    //   debugger
    // })

   
  //  })
  }
  function drawGrafica(el, i ){
    // return(
    //   <h1>{el}</h1>
    // )
    
      if(valuesAr[i].length > 0 ){
        var auxChart = {
          data: {
            labels: ["M", "T", "W", "T", "F", "S", "S"],
            series: [valuesAr[i]]
          }
        }
      
        return(
          <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color={ColorGrav[Math.floor(Math.random() * ColorGrav.length)]}>
              <ChartistGraph
                className="ct-chart"
                data={auxChart.data}
                type= {typeGrav[Math.floor(Math.random() * typeGrav.length)]}
                options={nitrogenosChart.options}
                listener={nitrogenosChart.animation}
              />
            </CardHeader>
            <CardBody>
        <h4 className={classes.cardTitle}>{el}</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        )
      }




  }
  function drawRecord(i){
  //   Object.keys(i.fields).forEach(function (item) {
  //    debugger
   
  //  })

  if (fields.length !== 0 ){
      return (
        <GridItem xs={12} sm={12} md={6}>
      <Card chart>
        <CardHeader color="danger">
         {i.fields['Ubicación']}
        </CardHeader>
        { Object.keys(i.fields).map((item) => drawBar(item,i.fields ))}
        {/* {  drawBar(i.fields)}  */}
        {/* <CardBody>
        {/* {  drawBar(i.fields)} */}
  
        {/* <h1>carlow</h1>
        </CardBody> */}
        {/* <CardFooter chart>
          <div className={classes.stats}>
            <AccessTime /> campaign sent 2 days ago
          </div>
        </CardFooter> */}
        {/* {i.fields['Latitude']}
        {i.fields['Longitude']} */}
    
      </Card>
    </GridItem>
      )
  }
    
  }
  const classes = useStyles();
  return (
    <div>


      <GridContainer>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                {/* <Icon>content_copy</Icon> */}
                <img src={rake} className='iconos-new'/>
              </CardIcon>
              <p className={classes.cardCategory}>Suelo Trabajado</p>
              <h3 className={classes.cardTitle}>
                25000 
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/* <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a> */}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <img src={molino} className='iconos-new'/>
                {/* <Store /> */}
              </CardIcon>
              <p className={classes.cardCategory}>Graneros</p>
              <h3 className={classes.cardTitle}>245</h3>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <img src={bag} className='iconos-new'/>
                {/* <Icon>info_outline</Icon> */}
              </CardIcon>
              <p className={classes.cardCategory}>Suelo Fertilizado</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <img src={planta} className='iconos-new'/>
                {/* <Accessibility /> */}
              </CardIcon>
              <p className={classes.cardCategory}>Cultivos</p>
              <h3 className={classes.cardTitle}>+24005</h3>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <Update />
                Just Updated
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
        <Map latitude={19.6452} longitude={-99.234523} lugares= {puntos}></Map>
      </GridItem>
      </GridContainer>

      <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
    <Tab label="Nutrientes"  >  carlos </Tab>
    <Tab label="Comparativa"  >  carlos </Tab>
    <Tab label="Sugerencias"  >  carlos </Tab>
 
  </Tabs>

  <TabPanel value={tabValue} index={0}>
  <GridContainer>


    {drawRecord(fields[fields.length - 1])}
    {drawRecord(fields[fields.length - 2])}
    </GridContainer>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        
      <GridContainer>
      {drawGrafica(values[0],0)}
      {drawGrafica(values[1],1)}
      {drawGrafica(values[2],2)}
      {drawGrafica(values[3],3)}
      {drawGrafica(values[4],4)}
      {drawGrafica(values[5],5)}
      {drawGrafica(values[6],6)}
      {drawGrafica(values[7],7)}
      {drawGrafica(values[8],8)}
      {drawGrafica(values[9],9)}
      {drawGrafica(values[10],10)}
      {drawGrafica(values[11],11)}
      {drawGrafica(values[12],12)}
      {drawGrafica(values[13],13)}
      {drawGrafica(values[14],14)}

      </GridContainer>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="TO_DO List:"
            headerColor="primary"
            tabs={[
            
              {
                tabName: "tips",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0,1]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              }
            ]}
          />
        </GridItem>
        </GridContainer>
        </TabPanel>
          <style>{`
          .iconos-new{
            width:50px
          }
          `}</style>
    </div>
  );
}

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Descripcion from './Descripcion/';

const useStyles = makeStyles({
  root: {
    //axWidth: 345
  },
  media: {
    height: 200,
    padding: '1em'
  }
});

const CatalogoVirtual = () => {
  const classes = useStyles();
  const tama = window.screen.width;
  const [open, setOpen] = React.useState(false);
  const [imgs, setImgs] = React.useState(null);

  const setHeaderimg = img => {
    setImgs(prevs => ({ ...prevs, imgheader: img }));
  };

  const handleOpen = data => {
    setImgs(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const datas = [
    {
      imgheader:
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo_300x200%2FZAPA%201_Mesa%20de%20trabajo%201.png?alt=media&token=48b11720-215a-434a-bdaa-c24e58792d89',
      imgconteiner: [
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F2.png?alt=media&token=a5b8ebc7-5052-4475-b96d-ceafd328bad0',
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F3.png?alt=media&token=173ff9dd-c43b-4f38-9243-e67461046b81',
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F4.png?alt=media&token=10fb4af3-e17b-4e29-b175-1c47c29f9c68'
      ]
    },
    {
      imgheader:
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo_300x200%2FZAPA%202_Mesa%20de%20trabajo%201.png?alt=media&token=b4eed121-cbe8-4f7a-967a-9197be0b7734',
      imgconteiner: [
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F2.png?alt=media&token=a5b8ebc7-5052-4475-b96d-ceafd328bad0',
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F3.png?alt=media&token=173ff9dd-c43b-4f38-9243-e67461046b81',
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F4.png?alt=media&token=10fb4af3-e17b-4e29-b175-1c47c29f9c68'
      ]
    },
    {
      imgheader:
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo_300x200%2FZAPA%203_Mesa%20de%20trabajo%201.png?alt=media&token=78aa4afb-8fe2-4600-8404-b8d3ed4b1201',
      imgconteiner: [
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F3.png?alt=media&token=173ff9dd-c43b-4f38-9243-e67461046b81',
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F3.png?alt=media&token=173ff9dd-c43b-4f38-9243-e67461046b81',
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F4.png?alt=media&token=10fb4af3-e17b-4e29-b175-1c47c29f9c68'
      ]
    },
    {
      imgheader:
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo_300x200%2FZAPA%204_Mesa%20de%20trabajo%201.png?alt=media&token=960ea8c2-4d40-40a2-87d2-31951114463f',
      imgconteiner: [
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F4.png?alt=media&token=10fb4af3-e17b-4e29-b175-1c47c29f9c68',
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F3.png?alt=media&token=173ff9dd-c43b-4f38-9243-e67461046b81',
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F4.png?alt=media&token=10fb4af3-e17b-4e29-b175-1c47c29f9c68'
      ]
    },
    {
      imgheader:
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo_300x200%2FZAPA%205_Mesa%20de%20trabajo%201.png?alt=media&token=732db462-6ba1-49d3-9bb9-cb856361ce9e',
      imgconteiner: [
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F5.png?alt=media&token=a16776fd-3aed-470d-8330-1b8231caf605',
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F3.png?alt=media&token=173ff9dd-c43b-4f38-9243-e67461046b81',
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F4.png?alt=media&token=10fb4af3-e17b-4e29-b175-1c47c29f9c68'
      ]
    },
    {
      imgheader:
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo_300x200%2FZAPA%206_Mesa%20de%20trabajo%201.png?alt=media&token=8dabb78b-a327-4dc0-a75c-32fc91bd1d2f',
      imgconteiner: [
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F6.png?alt=media&token=7a3b3ed1-01b9-487f-868c-27d1671ae9f6',
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F3.png?alt=media&token=173ff9dd-c43b-4f38-9243-e67461046b81',
        'https://firebasestorage.googleapis.com/v0/b/nevado-store.appspot.com/o/catalogo%2F4.png?alt=media&token=10fb4af3-e17b-4e29-b175-1c47c29f9c68'
      ]
    }
  ];

  return (
    <div>
      <Paper
        elevation={0}
        style={{
          height: '500px',
          backgroundImage:
            'url(\'https://images.squarespace-cdn.com/content/v1/57836a3f3e00be71f4719a85/1553682499255-T88KNJUT3EAPUL5HWKGB/ke17ZwdGBToddI8pDm48kIt4sjjsJou2GjInMlJIhlR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0vxgGVdDnL6CCr5FK_ApnxWVFFcmHtSzhfSGu0LxuW6Rsr_7xnuZTWl8VctZwoBSoQ/shutterstock_739595833.png?format=2500w\')',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#cccccc',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'relative'
        }}
      >
        <Descripcion
          handleClose={handleClose}
          img={imgs}
          open={open}
          setHeaderimg={setHeaderimg}
        />
        <div
          style={{
            position: 'absolute',
            textAlign: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Typography
            component="h2"
            style={{ color: 'white' }}
            variant="h1"
          >
            CATALOGO VIRTUAL PRODUCTOS NEVADO TODO TERRENO
          </Typography>
        </div>
      </Paper>

      <br />

      <Container fixed>
        <Grid
          container
          spacing={2}
        >
          {datas.map((ele, index) => (
            <Grid
              item
              key={index}
              xs={tama < 500 ? 12 : 3}
            >
              <Paper elevation={3}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={ele.imgheader}
                      style={tama < 500 ? { height: '250px' } : null}
                      title="Botin Corto"
                    />
                    <CardContent>
                      <Typography
                        component="h2"
                        gutterBottom
                        variant="h5"
                      >
                        Botin Corto
                      </Typography>
                      <Typography
                        color="textSecondary"
                        component="div"
                        variant="body2"
                      >
                        <h3>CAPELLADA: 100% cuero </h3>
                        <h3>FORRO: Textil </h3>
                        <h3>PLANTILLA: Textil </h3>
                        <h3>PLANTA: CAUCHO –EVA </h3>
                        <h3>TALLAS: 37-43</h3>
                        <h3>STOCK: 100PA </h3>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {/* <Button
                color="primary"
                size="small"
              >
                Share
              </Button> */}
                    <Button
                      color="primary"
                      onClick={() => handleOpen(ele)}
                      size="small"
                    >
                      ver detalle
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default CatalogoVirtual;

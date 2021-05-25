import React, {useEffect, useContext, useState} from 'react';
import {Text, View, StyleSheet, Modal} from 'react-native';

import {Context as MovieContext} from '../context/MovieContext';
import Loading from '../components/Loading';
import {Icon} from 'react-native-elements';

import Sit from '../components/Sit';

const ChoosePlaceScreen = ({route, navigation}) => {
  const {state, getScreening, getHall, getFreeTickets} =
    useContext(MovieContext);

  const [screening, setScreening] = useState(null);
  const [hall, setHall] = useState(null);
  const [freeTickets, setFreeTickets] = useState(null);

  const screeningId = route.params?.screeningId ?? null;

  useEffect(() => {
    const fetchData = async () => {
      getScreening(screeningId);
    };

    const fetchAddData = async () => {
      getHall(state.currScreening.hall_id);
      getFreeTickets(state.currScreening.id);
    };

    if (!state.currScreening) {
      fetchData();
    } else if (!state.currHall && state.freeTickets.length === 0) {
      setScreening(state.currScreening);
      fetchAddData();
    } else {
      setHall(state.currHall);
      setFreeTickets(state.freeTickets);
    }
  }, [state.currScreening, state.currHall, state.freeTickets]);

  if (!hall || freeTickets.length === 0) {
    return <Loading />;
  }

  const generateSitsView = () => {
    const columns = Math.min(hall.columns, 8);
    const rows = Math.min(hall.rows, 8);

    let sits = [];
    const sitsNumber = columns * rows;
    const freeSits = [];

    for (let i = 0; i < sitsNumber; i++) {
      const freeTicket = freeTickets[i];
      console.log(freeTicket);
      if (freeTicket.seat_number <= sitsNumber)
        freeSits.push(freeTicket.seat_number);
      else break;
    }

    const board = [];

    for (let i = 0; i < sitsNumber; i++) {
      const color = freeSits.includes(i + 1) ? '#ccc' : '#F16365';
      sits.push(<Sit color={color} size={30} />);
      if ((i + 1) % rows === 0) {
        board.push(
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>{sits}</View>,
        );
        sits = [];
      }
    }

    return <View style={styles.board}>{board}</View>;
  };

  const generateLegend = () => {
    const items = [];
    items.push(<Sit key={1} color={'#f5bf42'} size={50} text="Wybrane" />);
    items.push(<Sit key={2} color={'#ccc'} size={50} text="Wolne" />);
    items.push(<Sit ket={3} color={'#F16365'} size={50} text="Zajęte" />);

    return <View style={styles.legendContainer}>{items}</View>;
  };

  return (
    <View style={styles.container}>
      {console.log(screening)}
      {console.log(hall)}
      <Text style={styles.header}>Wybierz miejsce</Text>
      {generateSitsView()}
      {generateLegend()}

      <View style={styles.legendContainer}></View>
      <View style={styles.sitsContainer}></View>

      <View style={styles.modalView}>
        <Text style={styles.title}>
          {screening.movie_name.replace(/\(.*\)/, '')}
        </Text>
        <View style={styles.dateContainer}>
          <Text style={styles.day}>
            {screening.date.split(' ')[0].slice(5)}
          </Text>
          <Text style={styles.hour}>{screening.date.split(' ')[1]}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: '#000',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
  board: {
    marginTop: 30,
  },
  day: {
    fontSize: 18,
    color: '#fff',
  },
  hour: {
    fontSize: 18,
    color: '#fff',
  },
  header: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  legendContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '35%',
    backgroundColor: '#F16365',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 40,
    paddingTop: 20,
  },
});

export default ChoosePlaceScreen;

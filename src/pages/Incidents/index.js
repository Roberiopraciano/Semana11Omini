import React, { useEffect, useState } from 'react';
import {Image,Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import logoImg  from '../../assets/logo.png';
import styles from './styles';

import api from '../../services/api';


export default function Incidens(){
    const [incidents, setIncidents] = useState([]);
    const [total,setTotal] = useState(0);
    const navigation = useNavigation();
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(false);

    function navigationToDetail(incident){

        navigation.navigate('Detail',{incident});
    }

    async function loadIncidents() {
        try {
            if(loading){
                return;
            }
            
            if ((total > 0 )&& (incidents.length === total)){
                console.log(total);
                console.log(incidents.length);
                console.log('saiu');
                return;
            }

            setLoading(true);

            const response = await api.get('incidents',{params:{page}});

            setIncidents([...incidents,...response.data]);  
            setTotal(response.headers['x-total-count']);
            setPage(page+1);
            setLoading(false);
        } catch (error) {
            
        }
        

    }

    useEffect(() => {
        loadIncidents();
    }, [])
    
    return(
        <View style={styles.container}>
          <View style={styles.header}>
              <Image source={logoImg}/>
              <Text style={styles.headerText}>

                    Total de <Text style={styles.headerTextBold}>{total} Casos</Text>.

              </Text>
              
              
              
          </View>  

            <Text style={styles.title}>Bem Vindo</Text>
            <Text style={styles.description}>Escolha um dos casos Abaixo</Text>
 

            <FlatList
              showsVerticalScrollIndicator={false}
              data={incidents}
              onEndReached={loadIncidents}
              onEndReachedThreshold={0.2}
              style={styles.incidentList}
              keyExtractor={incident =>String(incident.id)}
                renderItem={({item: incident})=>(
                  <View style={styles.incident}>

                      <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                      <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                      <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat(
                                'pt-BR',{style:'currency',
                                currency:'BRL'} ).format(incident.value)}
                         </Text>

                      <TouchableOpacity
                          style={styles.detailsButton}
                          onPress={()=>navigationToDetail(incident)}>

                          <Text style={styles.detailsButtonText}>Ver Mais Detalhes</Text>
                          <Feather name="arrow-right" size={16} color="#e02041" />
                      </TouchableOpacity>
                  </View>

              )}
            
            />

            

           
        </View>    

    )
}
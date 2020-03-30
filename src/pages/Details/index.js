import React,{useEffect, useState} from 'react';
import { Image, Text, View, FlatList, TouchableOpacity ,Linking} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation,useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';


import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';


export default function Details() {
    const route = useRoute();
    const navigation = useNavigation();
  
    const incident =route.params.incident;
    
    const message = `Olá ${incident.name}, estou entrando em contato "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;

    function navigationBack() {

        navigation.goBack();
    }

   

    function sendMail(){
        MailComposer.composeAsync({
            subject:`Heroi do caso ${incident.title} `,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone='${incident.whatsapp}&text=${message}`); 
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <Image source={logoImg} />
              
                <TouchableOpacity onPress={navigationBack}>
                   <Feather name="arrow-left" size={28} color="#E82041"/>

                </TouchableOpacity>

           </View>

            <View style={styles.incident}>

                <Text style={[styles.incidentProperty,{marginTop:0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>
                    {incident.name} de 
                    {incident.city} - {incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                
                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat(
                        'pt-BR', {
                            style: 'currency',
                        currency: 'BRL'
                    }).format(incident.value)}
                </Text>

            </View>
           
           <View style={styles.contactBox}>
               <Text style={styles.heroTitle}>Salve o Dia!</Text>
               <Text style={styles.heroTitle}>Seja o Herio Desse Caso</Text>
               <Text style={styles.heroDescription}>Entre em Contacto</Text>
           
              <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendWhatsapp}>

                        <Text style={styles.actionText}>WhatsApp</Text>
                        <Feather name="arrow-right" size={16} color="#e02041" />
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendMail}>

                        <Text style={styles.actionText}>E-mail</Text>
                        <Feather name="arrow-right" size={16} color="#e02041" />
                    </TouchableOpacity>


              </View>
           
           </View>

        </View>  
    )
}
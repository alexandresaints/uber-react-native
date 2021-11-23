import { useState, useEffect } from 'react';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { Platform } from 'react-native';

export default () => {
  const [errorMsg, setErrorMsg] = useState(null); // será utilizado para armazenar alguma mensagem de erro, caso ocorra
  const [coords, setCoords] = useState(null);   //vai armazenar a localização atual
// criando um useEffect que será executado uma vez quando o Hook for chamado (parâmetro passado ao fim da função é vazio).
  useEffect(() => {
    (async function loadPosition() {
// A função requestMultiple serve para requisitar múltiplas autorizações do usuário em sequência. As requisições são feitas na ordem passada. 

      const result = requestMultiple(
        [
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
        ]).then(
          (statuses) => {
//statuses é um vetor que contém as respostas escolhidas pelo usuário em cada uma das autorizações solicitadas.
            const statusFine = statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];  //pegamos a autorização que o usuário selecionou para uso do GPS e para obter localização em primeiro plano
            const statusBack = statuses[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION]; 
//pegamos a autorização que o usuário selecionou para localização em background 
            if (Platform.Version < 29) { 
//Em APIs do Android abaixo da 29 não é necessário permissão para background location, apenas solicitar acesso ao GPS já oferece tudo que é necessário para utilizar a localização em primeiro e segundo plano. Nesse caso, apenas verificamos se a autorização do GPS é positiva
              if (statusFine == 'granted') {
                return true;
              } else {
                setErrorMsg('Usuário não aceitou solicitação de uso do GPS');
              }
            }
// Caso a API seja > 29, é necessário verificar se ambas as autorizações foram positivas. 
            if (statusFine == 'granted' && statusBack == 'granted') {
              return true;
            } else {
              setErrorMsg('Usuário não aceitou solicitação de uso do GPS');
            }
          },
        );

// caso as permissões tenham sido obtidas com sucesso, result será true e a localização do usuário poderá ser obtida.
      if (result) {
        await Geolocation.getCurrentPosition(       //se as permissões foram aceitas, obtemos a localização aqui
          ({ coords }) => {
	// O parâmetro {coords} desestrutura a resposta, obtendo apenas a parte relativa às coordenadas. Você também pode receber apenas (position) e observar outras informações que são obtidas ao se solicitar a localização. Nesse exemplo, apenas precisamos das coordenadas.
            setCoords({
              latitude: coords.latitude,
              longitude: coords.longitude,
            });
          }, (error) => {
            setErrorMsg('Não foi possível obter a localização');
          }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, showLocationDialog: true } 
          //showLocationDialog: essa função convida automaticamente o usuário a ativar o GPS, caso esteja desativado.
          //enableHighAccuracy: vai solicitar a ativação do GPS e coletar os dados dele
          //timeout: determina o tempo máximo para o dispositivo coletar uma posição
          //maximumAge: tempo máximo para coleta de posição armazenada em cache
        )
      }

    })()
  }, [])
//aqui retornamos as coordenadas e uma possível mensagem de erro que possa ter ocorrido.
  return { coords, errorMsg }
}
var ClusterON = true
var HeatON = true
var ClusterOFF = false
var HeatOFF = false
var OvCountON = true
var OvCountOFF = false
var EnquadarOn = true
var EnquadarOff = false
var OvExibirOn = true
var OvExibirOff = false

function BrowserIsPortuguese() {
  var Valor = false
  var userLang = navigator.language || navigator.userLanguage
  if (userLang == 'pt' || userLang=='pt-BR') Valor = true
  return Valor
}

function GetCurrentDir() {
  var loc = window.location.pathname
  var dir = loc.substring(0, loc.lastIndexOf('/'))
  dir = dir + '/'
  return dir
}

function HrefFromURL(Link,Titulo,Conteudo) {
  FullLink = HrefFromURLPlus(Link,Titulo,Conteudo,"")
  return FullLink
}
//Add opção Alvo (target='')
function HrefFromURLPlus(Link,Classe,Titulo,Conteudo,Alvo) {
  var TagAlvo = ""
  if ( Alvo ) TagAlvo = " target='"+ Alvo +"' "
  FullLink = "<a href='" + Link + "' class='" + Classe + "' title='"+ Titulo + "' " + TagAlvo + " >"+ Conteudo +"</a>"
  return FullLink
}
//------------------------------------
//Verifica se mrgControlPolylineMeasure está ativo
function mrgMedicaoEstaAtiva() {
  var Ativo = false
  var Titulo = $('.polyline-measure-unicode-icon').attr("title")
  if (Titulo == mrgTxtMeasureTitleOff) Ativo = true
  return Ativo
}


//------------------------------------
function GetLinkGraphhopper(Lat,Lon) {
  return `https://graphhopper.com/maps/?point=${gps ? gps : 'recife'}&point=${Lat}%2C${Lon}&locale=pt-BR&vehicle=car&weighting=fastest&elevation=true&use_miles=false&layer=OpenStreetMap`
}
function GetLinkMapillary(Lat,Lon,Zoom) {
  return `http://www.mapillary.com/app/?lat=${Lat}&lng=${Lon}&z=${Zoom}`
}
function GetLinkF4Map(Lat,Lon,Zoom) {
  return "http://demo.f4map.com/#lat=" + Lat + "&lon=" + Lon + "&zoom="+ Zoom + "&camera.theta=58.465"
}
function GetLinkOSMe(Lat,Lon) {
  return "http://www.openstreetmap.org/edit#map=18/" + Lat + "/" + Lon
}
function GetLinkOSMd(Lat,Lon,Zoom) {
  return "https://www.openstreetmap.org/query?lat="+Lat+"&lon="+Lon+"#map="+Zoom+"/"+Lat+"/"+Lon
}
function GetLinkNote(Lat,Lon) {
  return "http://www.openstreetmap.org/note/new#map=14/" + Lat + "/" + Lon
}
function GetLinkNote(Lat,Lon) {
  return "http://www.openstreetmap.org/note/new#map=14/" + Lat + "/" + Lon
}

function LinkDoMapa(Lat,Lon,Zoom,Dir,Param) {
   var Adicional = ""
   if (Param != null) {
     Adicional = Param
   }
  //var Host = "http://"+window.location.hostname
  //var PreLink = Host + Dir + '#' + Zoom + '/' + Lat + '/' + Lon
  var PreLink = Dir + '#' + Zoom + '/' + Lat + '/' + Lon
         + '&m=' + Lat + ',' + Lon + Adicional
  var Link = HrefFromURLPlus(PreLink,"fas fa-external-link-square-alt mrg-button",mrgTxtPermalink,"","")
  return Link
}

function CriarBotao(Link) {
  var Botao = "<div class='mrg-button'>"+Link+"</div>"
  return Botao
}

function GerarOpcoesDoMapa(Lat,Lon,Zoom,Dir) {
  var LinksAlvo = "_blank"
  var PreLinkGraphhpr = GetLinkGraphhopper(Lat,Lon)
  var PreLinkMapillary = GetLinkMapillary(Lat,Lon,Zoom)
  var PreLinkF4Map = GetLinkF4Map(Lat,Lon,Zoom)
  var PreLinkOSMe = GetLinkOSMe(Lat,Lon,Zoom)
  var PreLinkOSMd = GetLinkOSMd(Lat,Lon,Zoom)

  var LinkRoute = HrefFromURLPlus("#",     "fas fa-map-pin mrg-button",mrgTxtGraphhpr,"",LinksAlvo)
  var LinkGraphhpr = HrefFromURLPlus(PreLinkGraphhpr,     "fas fa-directions mrg-button",mrgTxtGraphhpr,"",LinksAlvo)
  var LinkMapillary = HrefFromURLPlus(PreLinkMapillary,"fas fa-street-view mrg-button",mrgTxtMapillary,"",LinksAlvo)
  var LinkF4Map = HrefFromURLPlus(PreLinkF4Map,    "fas fa-cube mrg-button",mrgTxtF4Map,"",LinksAlvo)
  var LinkOSMe = HrefFromURLPlus(PreLinkOSMe,     "fas fa-pen-square  mrg-button",mrgTxtOSMe,"",LinksAlvo)
  var LinkOSMd = HrefFromURLPlus(PreLinkOSMd,     "fas fa-search-plus mrg-button",mrgTxtOSMd,"",LinksAlvo)

  PreLinkNote = GetLinkNote(Lat,Lon)
  LinkNote = HrefFromURLPlus(PreLinkNote,"fas fa-comment mrg-button",mrgTxtNote,"",LinksAlvo)

  var Par = null
  if (mrgCamadaDeDados != null) {
    Par = "&dados=" + mrgCamadaDeDados
  }
  var LinkParaMapa = LinkDoMapa(Lat,Lon,Zoom,Dir,Par)

  LinksLegenda = "<div class='mrg-button-group'>"
    + CriarBotao(LinkParaMapa)
    + CriarBotao(LinkGraphhpr)
    + CriarBotao(LinkMapillary)
    + CriarBotao(LinkF4Map)
    + CriarBotao(LinkOSMe)
    + CriarBotao(LinkOSMd)
    + CriarBotao(LinkNote)
    + "<div class='mrg-floatstop'></div>"
    + "</div><div class='mrg-floatstop'></div>"

  return LinksLegenda
}

//Cria um ícone usando Leaflet.awesome-markers plugin
//Tamanho: Ainda não implementado = null
function MakeIconAwesome(Icone,Cor,Tamanho) {
  var tempIcon = L.AwesomeMarkers.icon({
    icon: Icone,
    markerColor: Cor,
    prefix: 'fa'
  })
  return tempIcon
}

function GitImgURL(URLBase,Pasta,Arquivo) {
  var URL = '<img src="'+ URLBase + Pasta + '/img/' + Arquivo + '.jpg' +'">'
  return URL
}

function ArraySearch(nameKey,myArray) {
  var Ret = -1
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i] === nameKey) Ret = i
  }
  return Ret
}

//Se icone é inédito adiciona no banco de dados de ícones
//mrgIconesOverlay.nome serve para relacionar a classe do icone para realizar busca por nome
function BuscarIcone(PropIcon,ColorIcon) {
  if (ColorIcon == null) ColorIcon = 'blue'
  if (PropIcon == null) PropIcon = 'circle'
  var PosBusca = ArraySearch(PropIcon,mrgIconesOverlayIndex)
  if (PosBusca < 0 ) {
    var IconeTemporario = MakeIconAwesome(PropIcon,ColorIcon,null)
    mrgIconesOverlay.push(IconeTemporario)
    mrgIconesOverlayIndex.push(PropIcon)
    PosBusca = mrgIconesOverlayIndex.length - 1
  }
  return PosBusca
}

//Funções voltadas para processamento de overlayers
//IconDefault é uma string que determina um ícone padrão para todos caso não especificado
//Adiciona uma camada no mapa com base em um arquivo existente
//Depende de:
//    controle mrgControlLayers
//    plugin omnivore
//INFO: mrgAddDataOverlay(Pasta,Arquivo,Apelido,IconDefault,IconMini,Enquadrar,Heat,Cluster)
//Os parâmetros podem ser passados de forma mais estruturada... verificar depois
function mrgAddDataOverlay(Pasta,Arquivo,Apelido,IconDefault,IconMini,Enquadrar,AddHeat,AddCluster,ContarItens,Exibir) {
  var ContM = 0
    var ResultTemp = []
  var olTemp = omnivore.geojson(mrgURLBaseMapasGEOJSON + Pasta + '/' + Arquivo +'.geojson') //Sempre vai estar contido em uma pasta com o mesmo nome do arquivo
    olTemp.on('layeradd', function(e) {
       var IsMarker = false
       var Imagem = ""
             var marker = e.layer
       var Propriedades = marker.feature.properties
       var Tipo = marker.feature.geometry.type
       if (Tipo == 'LineString') {IsMarker = false}
       //Aqui trata da formatação de cada elemento. Se for marcador, define ícone. Do contrário, trata como polígono.
      var URLchegar = ""
      if (IsMarker) {
        var URLchegar = HrefFromURLPlus(
                GetLinkGraphhopper(LatLon.lat,LatLon.lng), "",mrgTxtGraphhpr,"<br><span class='fas fa-directions'></span> como chegar","_blank"
        )
        var Conteudo = '<b>'+Propriedades.name +'</b><br>'+ Imagem + Propriedades.description + URLchegar
        marker.autoPan = true
        marker.bindPopup(Conteudo,{maxWidth: 160, maxHeight: 300})
        ContM = ContM + 1
        var LatLon = marker.getLatLng
        if (typeof Propriedades.icon !== 'undefined') {  //verifica se existe ícone para alterar
          var PosBusca = BuscarIcone(Propriedades.icon,Propriedades.color)
        }else{
          var PosBusca = BuscarIcone(IconDefault,null)
        }
         marker.setIcon(mrgIconesOverlay[PosBusca])
        //Se não usar cluster, usa opção spiderfy
        if (!AddCluster) {
          mrgOverlappingMS.addMarker(marker) //dev
        }
        if (AddHeat) {mrgHeatMap.addLatLng(LatLon)}   //Se pedir pra por no Heat map...
       } else {
         marker.setStyle({
           color:      Propriedades.color,
           fillColor:   Propriedades.fillColor,
           fillOpacity: Propriedades.fillOpacity,
           fill:      Propriedades.fill
         })
       }
       //Verifica o atributo img, que aponta para uma imagem previamente hospedada no local especificado
       if (typeof Propriedades.img !== 'undefined') { //tem imagem?
        Imagem = GitImgURL(mrgURLBaseMapasGEOJSON,Pasta,Propriedades.img)
       }
    })
      .on('ready', function () {
        var TextoTemp = ""
        if (ContarItens) TextoTemp = ContM + " "

        if (!mrgControlLayersShow) {
          $('.leaflet-control-layers').show()
          mrgButtonDadosExit.addTo(map)
        }

        mrgOverlaysArray.push(olTemp) //Registra overlay para poder remover depois
        //Se usar Cluster, não precisa por no mapa de novo
        //subgCluster foi criada em initmap.js
        if (AddCluster) {
          subgCluster.addLayer(olTemp)
          mrgMapHasCluster = true
          mrgControlLayers.addOverlay(subgCluster, '<span class="fas fa-'+  IconMini  +'"> <span class="mrg-ovlayer-'+Arquivo+ '">'+ TextoTemp + Apelido + '</span>')
          if (!Exibir) {
            //DEV
          }

        } else {
          mrgControlLayers.addOverlay(olTemp, '<span class="fas fa-'+  IconMini  +'"> <span class="mrg-ovlayer-'+Arquivo+ '">'+ TextoTemp + Apelido + '</span>')
          if (Exibir) map.addLayer(olTemp)
        }

        if (Enquadrar) map.fitBounds(olTemp.getBounds())
      })
}

function TrocaTexto(Classe,Conteudo) {
  $( Classe ).text(Conteudo)
}

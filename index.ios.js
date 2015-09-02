/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React  =  require('react-native');
var Assets =  require('./Assets.ios');
var Button =  require('react-native-button');


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  View,
  ListView,
  TouchableHighlight
} = React;

var component = React.createClass({


  getInitialState: function() {
  
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      imageNumber: DEFAULT_IMAGE_NUMBER,
      localImage : DEFAULT_LOCAL_IMAGE 
    };

  },
  _onSucessAssetDownload: function(response) {
      
      this.setState({localImage: response.filename});
      this._listAssets();
  },
  _error : function(error){
    console.log('error callback ',error);
    alert('Error!!',error);
  },

  _onSucessListAssets: function(arrayFilenames){

       this.setState({
          dataSource: this.state.dataSource.cloneWithRows(arrayFilenames)
       });
  },

  _onSucessDeleteAsset: function (){
     
     this._listAssets();

  },
  _dowloadAssest: function(){

    var imageUrl = BASE_URL + this.state.imageNumber + '.jpg' 

    Assets.downloadResourceFromUrl(imageUrl, CACHE_DIR, this._onSucessAssetDownload, this._error);
   
  },
   _listAssets: function(){

    Assets.listResourcesInCache(CACHE_DIR, this._onSucessListAssets, this._error);
   
  },
   _extractFileName: function(filePath){
   
   return filePath.substring(filePath.lastIndexOf("/")+1,filePath.length);
   
  },

  _deleteAsset: function (data){
     
     console.log('delete asset',data)
     Assets.deleteResourceInCache(data,CACHE_DIR,this._onSucessDeleteAsset)
  
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number) {

   var fileName  = this._extractFileName(rowData);
   var localPath = rowData.replace('file://','');
   
   return (          
            <View style={ { flexDirection: 'row', justifyContent:'space-between' }} >
              <TouchableHighlight onPress={ this._deleteAsset.bind(this, fileName) }>
                <Image source={{uri: MINUS_IMAGE.path}}
                 style={{width: 20, height: 20, resizeMode: 'stretch', alignSelf:'flex-start'}} /> 
             </TouchableHighlight> 
              <Image source={{uri: localPath}}
               style={{width: 80, height: 80, resizeMode: 'stretch'}} />               
              <Text>{fileName}</Text>             
            </View>    
    );
  },

  render: function() {

 
    return (

    
      <View style={styles.container}>      
        <Text style={{color: 'black', textAlign: 'left' ,margin:10}} >
          BASE URL:
        </Text>
         <Text style={{color: 'blue', margin:10, flexWrap:'wrap'  }} >
          {BASE_URL}
        </Text>
        
        <View style={ {  width:200, flexDirection: 'row', flexWrap:'wrap' } } >      
         <TextInput
          style={{height: 40, width:80, margin:10, borderColor: 'gray', borderWidth: 1, textAlign:'center'}}
             onChangeText={(imageNumber) => this.setState({imageNumber})}
             defaultValue={DEFAULT_IMAGE_NUMBER}
             value={this.state.imageNumber}
         />

         <Text style={{color: 'blue', marginTop:20 }} >
          .jpg
         </Text>
        </View>

        <Button style={{color: 'black', backgroundColor:'#58ACFA', margin:10}} onPress={this._dowloadAssest}>
          Download!!
        </Button> 

         <ListView
          style={{margin: 10}}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
    

      </View>
    );
  }
});

var DEFAULT_LOCAL_IMAGE = require('image!no_image_available')
var MINUS_IMAGE = require('image!minus')

var BASE_URL = 'https://s3.amazonaws.com/99Covers-Facebook-Covers/watermark/';
var DEFAULT_IMAGE_NUMBER = 10;

var CACHE_DIR = 'images';


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    margin:10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RCTAssetsManager', () => component);

import conf from "../conf/conf";
import { Client,ID,Databases ,Query} from "appwrite";


export class Comments {
        client=new Client();
        databases;

        constructor() {
            this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            

            this.databases=new Databases(this.client);
        }

        async createComment({Comments,userId,postId,userName}){
             console.log(Comments,userId,postId);
             console.log(conf.appwriteProjectId);
             
             
            try {
              return await this.databases.createDocument(
                 conf.appwriteDatabaseId,
                 conf.appwriteCommentCollection,
                 ID.unique(),
                 {
                    Comments,
                    userId,
                    postId,
                    userName,
                 }

              )    
            

            } catch (error) {
                console.log("Error while Commenting",error)
                
            }

        }

        async getComment(postId){
          console.log(postId);
          
           
            try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollection,
                [Query.equal("postId",postId)]
                
            )       
            

            } catch (error) {
                console.log("Error while fetching comments",error);
                
            }
        }
}

const comments=new Comments()

export default comments;
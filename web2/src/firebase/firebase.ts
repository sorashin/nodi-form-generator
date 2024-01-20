import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import Project, { ProjectJSONType } from '../assets/scripts/service/Project';

//TODO: replace your firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDrFUc4IdlvjcGyIcvi-WKQsg74t-gNXe8",
  authDomain: "nodi-example.firebaseapp.com",
  projectId: "nodi-example",
  storageBucket: "nodi-example.appspot.com",
  messagingSenderId: "161772244103",
  appId: "1:161772244103:web:b01c8c75df1a5493023c22"
};


if (!firebase.apps.length) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetProjectResponse = Promise<{ project: Project, doc: any }>;

const graphCollectionName = 'graph';

export const getProjectDocument = async (id: string): Promise<firebase.firestore.DocumentData> => {
  const query = firestore.collection(graphCollectionName).doc(id);
  const doc = await query.get();
  return Promise.resolve(doc);
};

export const getProject = async (id: string): Promise<{ project: Project, doc: any }> => {
  const doc = await getProjectDocument(id);
  if (doc.exists) {
    const id = doc.ref.id;
    const json = doc.data();
    const project = new Project();
    project.fromJSON(id, json as ProjectJSONType);
    return Promise.resolve({
      project, doc: json
    });
  }
  return Promise.reject(new Error('this file is not existed.'));
};

export const duplicateProject = async (id: string): Promise<Project> => {
  const { project } = await getProject(id);
  project.title += ' copy';
  project.timestamp = firebase.firestore.Timestamp.now();
  const ref = await firestore.collection(graphCollectionName).add(project.toJSON());
  project.id = ref.id;
  return Promise.resolve(project);
};

export const deleteProject = async (id: string): Promise<void> => {
  const doc = await getProjectDocument(id);
  if (doc.exists) {
    const data = doc.data() as ProjectJSONType;
    data.deleted = true;
    await doc.ref.update(data);
    return Promise.resolve();
  }
  return Promise.reject(new Error('this file is not existed.'));
};

export const getTimestamp = (): firebase.firestore.Timestamp => {
  return firebase.firestore.Timestamp.now();
};
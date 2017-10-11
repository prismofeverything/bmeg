
<center>
<img src="/bmeg-flat.png" width="300px"/>
</center>

The BioMedical Evidence Graph (BMEG) is a system to collect heterogeneous 
information into a common analysis framework. It is based on a graph database
and presents various endpoints that allow access to that data. There are also 
HTTP API based endpoints for directly querying the graph.
            
            
Graphs are an incredibly informative technique to represent biological information. 
Many different types of biological information, including pathway information, 
sample relationships and ontological information are best represented with graphs. 


Building The BMEG
=================

To provide the best quality data, the BMEG team has collaborated with researchers from OICR and Sage BioNetworks
to run community benchmark challenges to find the best methods for analysis. The challenges we've helped to run include:



Accessing the BMEG
==================
 
First, import the Ophion client and create a connection to an existing Ophion API (here we use the BMEG at OHSU):

```
import ophion
O = ophion.Ophion('http://bmeg.io')
Now that we have an Ophion instance, we can use this to make all of our queries.
```

Finding a vertex
----------------

One of the first things you probably want to do is find some vertex out of all of the vertexes available in the system. In order to do this, we need to know something about the vertex we are looking for. To start, let's see if we can find a specific gene:

```
O.query().has("symbol", "TP53").execute()
```

A couple things about this first and simplest query. We start with O, our Ophion instance connected to the BMEG, and create a new query with .query(). This query is now being constructed. You can chain along as many operations as you want, and nothing will actually get sent to the server until you call .execute().

Once we make this query, we get a result:
```
[{u'gid': u'gene:TP53',
  u'label': u'Gene',
  u'properties': {u'accession': u'AF307851',
   u'chromosome': u'17p13.1',
   u'description': u'tumor protein p53',
   u'refseq': u'NM_000546',
   u'symbol': u'TP53',
   u'type': u'Gene'}}]
```

This represents the vertex we queried for above. All vertexes in the system will have a similar structure, basically:

gid: This represents the global identifier for this vertex. In order to draw edges between different vertexes from different data sets we need an identifier that can be constructed from available data. Often, the gid will be the field that you query on as a starting point for a traversal.
label: The label represents the type of the vertex. All vertexes with a given label will share many property keys and edge labels, and form a logical group within the system.
properties: This is where all the data goes. properties can be an arbitrary map, and these properties can be referenced during traversals.
You can also do a has query with a list of items using O.within([...]) (other conditions exist, see the Conditions section below):

```
O.query().has("symbol", O.within(["TP53", "BRCA1"])).execute()
```
This returns both Gene vertexes:
```
[{u'gid': u'gene:TP53',
  u'label': u'Gene',
  u'properties': {u'accession': u'AF307851',
   u'chromosome': u'17p13.1',
   u'description': u'tumor protein p53',
   u'refseq': u'NM_000546',
   u'symbol': u'TP53',
   u'type': u'Gene'}},
 {u'gid': u'gene:BRCA1',
  u'label': u'Gene',
  u'properties': {u'accession': u'U14680',
   u'chromosome': u'17q21.31',
   u'description': u'BRCA1, DNA repair associated',
   u'refseq': u'NM_007294',
   u'symbol': u'BRCA1',
   u'type': u'Gene'}}]
```

Traversing the graph
--------------------

Once you are on a vertex, you can travel through that vertex's edges to find the vertexes it is connected to. Sometimes you don't even need to go all the way to the next vertex, the information on the edge between them may be sufficient.

Edges in the graph are directional, so there are both incoming and outgoing edges from each vertex, leading to other vertexes in the graph. Edges also have a label, which distinguishes the kind of connections different vertexes can have with one another.

Let's start with our old friend, Gene TP53, and see what kind of other vertexes it is connected to.

```
O.query().has("symbol", "TP53").outgoing().label().groupCount().execute()
```

Here we have introduced a couple of new steps. The first is .outgoing(). This starts from wherever you are in the graph at the moment and travels out along all the outgoing edges.

By the time we call .label(), we are on these associated vertexes. label just gets the label of the vertex and ignores all the other properties.

At this point we have a bunch of labels. Now we call .groupCount() on these labels to get a tally of what kinds of vertexes our original TP53 gene is connected to.

As it turns out, in this case the results are not very exciting:

```
[{u'Pubmed': 3}]
```

Let's check out going in the other direction:

```
O.query().has("symbol", "TP53").incoming().label().groupCount().execute()
```

Here we have swapped out outgoing for incoming, and it turns out that there are a lot more things pointing at TP53 than there are pointing away:

```
[{u'CNASegment': 708,
  u'GeneDatabase': 12,
  u'Variant': 8245,
  u'type': 1}]
```

So, there are 708 copy number segments, 12 gene databases, and 8245 variants. Also, one thing called "type".
